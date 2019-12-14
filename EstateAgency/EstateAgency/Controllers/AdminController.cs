using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels.AdvertisementViewModels;
using EstateAgency.ViewModels.UserViewModels;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.Controllers
{
    public class AdminController : BaseApiController
    {
        #region Private Fields 

        private readonly ApplicationDbContext _dbContext;

        #endregion

        #region Constructor    

        public AdminController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
            )
            : base(context, roleManager, userManager, configuration)
        {
            _dbContext = context;
        }

        #endregion Constructor

        #region Attribute-based routing methods

        [HttpGet("AplicationUsers")]
        [Authorize]
        public async Task<IActionResult> AplicationUsersAsync()
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();

            if (requestUser == null || requestUser.Type != 1)
            {
                return Unauthorized();
            }

            var users = _dbContext.Users.Where(u => u.Type != 1).ToArray();

            return new JsonResult(users.Adapt<UserManagementViewModel[]>(), JsonSettings);
        }

        [HttpPut("LockUser")]
        [Authorize]
        public IActionResult LockUser([FromBody] UserBlockingViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == model.Id);
            user.Flags = 1;
            _dbContext.SaveChanges();

            var users = _dbContext.Users.Where(u => u.Type != 1).ToArray();

            return new JsonResult(users.Adapt<UserManagementViewModel[]>(), JsonSettings);
        }

        [HttpPut("UnlockUser")]
        [Authorize]
        public IActionResult UnlockUser([FromBody] UserBlockingViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == model.Id);
            user.Flags = 0;
            _dbContext.SaveChanges();

            var users = _dbContext.Users.Where(u => u.Type != 1).ToArray();

            return new JsonResult(users.Adapt<UserManagementViewModel[]>(), JsonSettings);
        }

        [HttpGet("AplicationAdvertisements")]
        public IActionResult AplicationAdvertisementsAsync()
        {
            var advertisements = _dbContext.Advertisements;

            foreach (var advertisement in advertisements)
            {
                advertisement.Images = _dbContext.Images.Where(image => image.AdvertisementId == advertisement.Id).Take(1).ToList();
            }

            return new JsonResult(advertisements.Adapt<AdvertisementManagementViewModel[]>(), JsonSettings);
        }

        [HttpPut("ManagementAdvertisement")]
        [Authorize]
        public IActionResult ManagementAdvertisement([FromBody] AdvertisementBlockingViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var advertisement = _dbContext.Advertisements.FirstOrDefault(u => u.Id == model.Id);

            if(model.Management == "unlock")
            {
                advertisement.Flag = 0;
            }
            else
            {
                advertisement.Flag = 1;
            }
            
            _dbContext.SaveChanges();

            var advertisements = _dbContext.Advertisements;

            foreach (var advert in advertisements)
            {
                advert.Images = _dbContext.Images.Where(image => image.AdvertisementId == advert.Id).Take(1).ToList();
            }

            return new JsonResult(advertisements.Adapt<AdvertisementManagementViewModel[]>(), JsonSettings);
        }


        #endregion
    }
}
