using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using Mapster;
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

        [HttpPut]
        [Authorize]
        public IActionResult Put(ReservationViewModel m)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostAsync([FromBody]ReservationViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            ApplicationUser currentUser = await GetCurrentUserAsync();

            var reservations = _dbContext.Reservations.Where(r => r.AdvertisementId == model.Id).ToList();

            foreach(var res in reservations)
            {
                if(res.ReservationActive == 1)
                {
                    var tmpTime = DateTime.Now.Subtract(res.CreatedDate).TotalMinutes;
                    if (tmpTime > 1440)
                    {
                        res.ReservationActive = 0;
                    }
                    else
                    {
                        return BadRequest(115);
                    }
                }
            }

            var reservation = new Reservation
            {
                Id = Guid.NewGuid().ToString(),
                UserId = currentUser.Id.ToString(),
                AdvertisementId = model.Id,
                ReservationActive = 1,
                CreatedDate = DateTime.Now,
                ReservationTo = DateTime.Now,
                ReservationFrom = DateTime.Now.AddDays(1)
            };

            _dbContext.Reservations.Add(reservation);
            _dbContext.SaveChanges();

            return Json(reservation.Adapt<ReservationViewModel>(), JsonSettings);
        }

        #endregion
    }
}
