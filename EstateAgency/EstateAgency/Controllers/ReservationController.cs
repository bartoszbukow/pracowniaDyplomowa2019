using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace EstateAgency.Controllers
{
    public class ReservationController : BaseApiController
    {
        #region Private Fields 

        private readonly ApplicationDbContext _dbContext;

        #endregion

        #region Constructor    

        public ReservationController(ApplicationDbContext context,
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
            return Content("Not implemented (yet)!");
        }

        [HttpPut]
        [Authorize]
        public IActionResult Put(ReservationViewModel m)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post(ReservationViewModel m)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Attribute-based routing methods

        // GET api/reservation/all
        [HttpGet("All/{questionId}")]
        public IActionResult All(string userId, string advertisementId)
        {
            var sampleReservation = new List<ReservationViewModel>();
            // add a first sample reservation
            sampleReservation.Add(new ReservationViewModel()
            {
                Id = "1",
                UserId = userId,
                AdvertisementId = advertisementId,
                CreatedDate = DateTime.Now,
                ReservationFrom = DateTime.Now,
                ReservationTo = DateTime.Now
            });
            // add a bunch of other sample reservations
            for (int i = 2; i <= 5; i++)
            {
                sampleReservation.Add(new ReservationViewModel()
                {
                    Id = $"{i}",
                    UserId = userId,
                    AdvertisementId = advertisementId,
                    CreatedDate = DateTime.Now,
                    ReservationFrom = DateTime.Now,
                    ReservationTo = DateTime.Now
                });
            }
            // output the result in JSON format
            return new JsonResult(
                sampleReservation, JsonSettings);
        }

        #endregion
    }
}
