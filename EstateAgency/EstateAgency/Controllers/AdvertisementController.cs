﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Authorization;
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

            foreach (var image in _dbContext.Images)
            {
                if (image.AdvertisementId == id)
                {
                    advertisement.Images.Add(image);
                }
            }

            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);
        }

        [HttpPut]
        [Authorize]
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
                CreatedDate = DateTime.Now,
                NumberOfRoom = model.NumberOfRoom,
                City = model.City,
                Address = model.Address
            };

            advertisement.LastModifiedDate = advertisement.CreatedDate;
            advertisement.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            _dbContext.Advertisements.Add(advertisement);
            _dbContext.SaveChanges();

            if (model.Images == null)
            {
                _dbContext.Images.Add(new Image()
                {
                    AdvertisementId = advertisement.Id,
                    Path = $"empty-photo.jpg"
                });
            }

            _dbContext.SaveChanges();

            return new JsonResult(advertisement.Adapt<AdvertisementViewModel>(), JsonSettings);
        }

        [HttpPost]
        [Authorize]
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

            foreach(var advertisement in latest)
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

        #endregion
    }

}
