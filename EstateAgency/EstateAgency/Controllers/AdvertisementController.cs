using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EstateAgency.Controllers
{
    public class AdvertisementController : BaseApiController
    {
        #region Private Fields 

        private readonly ApplicationDbContext _dbContext;

        #endregion

        #region Constructor    

        public AdvertisementController(ApplicationDbContext context) : base(context)
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

            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);
        }

        public IActionResult Put([FromBody]AdvertisementViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var advertisement = new Advertisement
            {
                Title = model.Title,
                Description = model.Description,
                Price = model.Price,
                Yardage = model.Yardage,
                Category = model.Category,
                Type = model.Type,
                CreatedDate = DateTime.Now
            };

            advertisement.LastModifiedDate = advertisement.CreatedDate;
            advertisement.UserId = _dbContext.Users.FirstOrDefault(u => u.UserName == "Admin")?.Id;

            _dbContext.Advertisements.Add(advertisement);
            _dbContext.SaveChanges();


            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AdvertisementViewModel model)
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
        public IActionResult Delete(string id)
        {
            var advertisement = _dbContext.Advertisements.FirstOrDefault(i => i.Id == id);

            if (advertisement == null)
            {
                return NotFound(new { Error = $"Advertisement ID {id} has not been found"});
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

        #endregion
    }

}
