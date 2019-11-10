using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EstateAgency.Controllers
{
    public class AdvertisementController : BaseApiController
    {
        #region Private Fields 

        private readonly ApplicationDbContext _dbContext;

        #endregion

        #region Constructor    

        public AdvertisementController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
            )
            : base(context, roleManager, userManager, configuration)
        {
            _dbContext = context;
        }

        #endregion Constructor


        #region RESTful conventions methods

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var advertisement = _dbContext.Advertisements.FirstOrDefault(i => i.Id == id);

            if (advertisement == null)
            {
                return NotFound(new
                {
                    Error = $"Advertisement ID {id} has not been found"
                });
            }

            advertisement.Images = _dbContext.Images.Where(image => image.AdvertisementId == id).ToList();

            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);
        }

        [HttpPost("create"), DisableRequestSizeLimit]
        [Authorize]
        public IActionResult Post(IFormCollection form)
        {
            if (form == null) return new StatusCodeResult(500);

            var advertisement = new Advertisement
            {
                Title = form["title"],
                Description = form["description"],
                Price = Convert.ToDouble(form["price"]),
                Yardage = Convert.ToDouble(form["yardage"]),
                Category = form["category"],
                Type = Convert.ToInt32(form["type"]),
                CreatedDate = DateTime.Now,
                NumberOfRoom = Convert.ToInt32(form["numberOfRoom"]),
                City = form["city"],
                Address = form["address"]
            };

            advertisement.LastModifiedDate = advertisement.CreatedDate;
            advertisement.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            _dbContext.Advertisements.Add(advertisement);

            var files = Request.Form.Files;
            var folderName = Path.Combine("wwwroot", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (files.Count == 0)
            {
                _dbContext.Images.Add(new Image()
                {
                    AdvertisementId = advertisement.Id,
                    Path = $"empty-photo.jpg"
                });
            }
            else
            {
                foreach (var file in files)
                {
                    var fileName = Guid.NewGuid().ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName); 

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    _dbContext.Images.Add(new Image()
                    {
                        AdvertisementId = advertisement.Id,
                        Path = dbPath
                    });
                }
            }
            _dbContext.SaveChanges();
            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);

        }

        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody]AdvertisementViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var advertisement = _dbContext.Advertisements.FirstOrDefault(q => q.Id == model.Id);

            if (advertisement == null)
            {
                return NotFound(new { Error = $"Advertisement ID {model.Id} has not been found" });
            }

            advertisement.Title = model.Title;
            advertisement.Description = model.Description;
            advertisement.Price = model.Price;
            advertisement.Yardage = model.Yardage;
            advertisement.Category = model.Category;
            advertisement.LastModifiedDate = advertisement.CreatedDate;

            _dbContext.SaveChanges();

            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            var advertisement = _dbContext.Advertisements.FirstOrDefault(i => i.Id == id);

            if (advertisement == null)
            {
                return NotFound(new { Error = $"Advertisement ID {id} has not been found" });
            }

            _dbContext.Advertisements.Remove(advertisement);
            _dbContext.SaveChanges();
            return new OkResult();
        }

        #endregion

        #region Attribute-based routing methods

        // GET api/advertisement/latest
        [HttpGet("Latest/{num}")]
        public IActionResult Latest(int num = 10)
        {
            var latest = _dbContext.Advertisements.OrderByDescending(q => q.CreatedDate).Take(num).ToArray();

            foreach (var advertisement in latest)
            {
                foreach (var image in _dbContext.Images)
                {
                    if (image.AdvertisementId == advertisement.Id)
                    {
                        advertisement.Images.Add(image);
                    }
                }
            }

            return new JsonResult(latest.Adapt<AdvertisementViewModel[]>(), JsonSettings);
        }

        [HttpGet("ByTitle/{num:int?}")]
        public IActionResult ByTitle(int num = 10)
        {
            var byTitle = _dbContext.Advertisements.OrderBy(q => q.Title).Take(num).ToArray();

            return new JsonResult(byTitle.Adapt<AdvertisementViewModel[]>(), JsonSettings);
        }

        [HttpGet("Random/{num:int?}")]
        public IActionResult Random(int num = 10)
        {
            var random = _dbContext.Advertisements.OrderBy(q => Guid.NewGuid()).Take(num).ToArray();

            return new JsonResult(random.Adapt<AdvertisementViewModel[]>(), JsonSettings);
        }

        [HttpGet("MyAdvertisement")]
        public async Task<IActionResult> MyAdvertisement()
        {
            var requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            var advertisements = _dbContext.Advertisements.Where(i => i.User.Id == requestUser.Id).ToArray(); 

            if (advertisements == null)
            {
                return NotFound(new
                {
                    Error = $"User with ID {requestUser.Id} has no adverts"
                });
            }

            foreach(var advertisement in advertisements)
            {
                advertisement.Images = _dbContext.Images.Where(image => image.AdvertisementId == advertisement.Id).ToList();
            }
            
            return new JsonResult(advertisements.Adapt<AdvertisementViewModel[]>(), JsonSettings);
        }

        #endregion
    }

}
