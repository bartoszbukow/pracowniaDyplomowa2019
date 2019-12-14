using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using EstateAgency.ViewModels.UserViewModels;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.Controllers
{
    public class UserController : BaseApiController
    {
        #region Constructor    
        public UserController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }
        #endregion

        #region RESTful Conventions    

        [HttpPost()]
        public async Task<IActionResult> UserAdd([FromBody]UserViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            ApplicationUser user = await UserManager.FindByEmailAsync(model.Email);

            if (user != null) return BadRequest(106);
            var now = DateTime.Now;

            user = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email,
                Name = model.Name,
                Email = model.Email,
                Surname = model.Surname,
                PhoneNumber = model.PhoneNumber,
                CreatedDate = now,
                LastModifiedDate = now
            };


            await UserManager.CreateAsync(user, model.Password);
            await UserManager.AddToRoleAsync(user, "RegisteredUser");

            user.EmailConfirmed = true;
            user.LockoutEnabled = false;

            DbContext.SaveChanges();
            return Json(user.Adapt<UserViewModel>(), JsonSettings);
        }

        [HttpGet("UserId")]
        [Authorize]
        public async Task<IActionResult> MyAdvertisement()
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            return new JsonResult(requestUser.Id, JsonSettings);
        }

        [HttpGet("UserEmail")]
        [Authorize]
        public async Task<IActionResult> MyEmail()
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            return new JsonResult(requestUser.Email, JsonSettings);
        }

        [HttpPut("UserEdit")]
        [Authorize]
        public async Task<IActionResult> UserEdit([FromBody] UserEditViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);
            ApplicationUser user = await GetCurrentUserAsync();

            if (user == null) return NotFound(new { Error = $"The user has not been found" });

            user.Name = model.Name;
            user.PhoneNumber = model.PhoneNumber;
            user.Surname = model.Surname;

            var result = await UserManager.UpdateAsync(user);

            if (result.Errors.Any())
            {
                return BadRequest(103);
            }

            return new JsonResult(user.Adapt<UserEditViewModel>(), JsonSettings);
        }

        [HttpPut("UserChangePassword")]
        [Authorize]
        public async Task<IActionResult> UserChangePassword([FromBody] UserChangePasswordViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            ApplicationUser user = await GetCurrentUserAsync();
            var result = await UserManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (result.Errors.Any())
            {
                return BadRequest(100);
            }

            return new JsonResult(user.Adapt<UserEditViewModel>(), JsonSettings);
        }

        [HttpDelete("UserDelete")]
        [Authorize]
        public async Task<IActionResult> UserDelete([FromBody] UserDeleteViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            ApplicationUser user = await UserManager.FindByIdAsync(model.Id);
            var advertisements = DbContext.Advertisements.Where(q => q.UserId == model.Id);

            foreach (var advertisement in advertisements)
            {
                DbContext.Advertisements.Remove(advertisement);
            }

            var result = await UserManager.DeleteAsync(user);
            return Ok(result);
        }

        [HttpGet("UserEditData")]
        [Authorize]
        public async Task<IActionResult> UserEditData()
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            return new JsonResult(requestUser.Adapt<UserEditViewModel>(), JsonSettings);
        }

        [HttpGet("CurrentUser")]
        [Authorize]
        public async Task<IActionResult> CurrentUser()
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            return new JsonResult(requestUser.Adapt<UserCurrentViewModel>(), JsonSettings);
        }

        #endregion
    }
}


