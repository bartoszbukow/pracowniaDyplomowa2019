using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EstateAgency.Controllers
{
    [Route("api/[controller]")]
    public class AdvertisementHistoryController : Controller
    {
        #region RESTful conventions methods 

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Content("Not implemented (yet)!");
        }

        public IActionResult Put(AdvertisementHistoryViewModel m)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Post(AdvertisementHistoryViewModel m)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Attribute-based routing methods

        // GET api/advertisementHistory/all
        [HttpGet("All/{quizId}")]
        public IActionResult All(string advertisementId)
        {
            var sampleAdvertisementHistory = new List<AdvertisementHistoryViewModel>
            {
                // add a first sample advertisement history
                new AdvertisementHistoryViewModel()
                {
                    Id = "1",
                    AdvertisementId = advertisementId,
                    Notes = "What do you value most in your life?",
                    CreatedDate = DateTime.Now
                }
            };
            // add a bunch of other sample advertisement history
            for (int i = 2; i <= 5; i++)
            {
                sampleAdvertisementHistory.Add(new AdvertisementHistoryViewModel()
                {
                    Id = $"{i}",
                    AdvertisementId = advertisementId,
                    Notes = $"Sample Question {i}",
                    CreatedDate = DateTime.Now
                });
            }
            // output the result in JSON format
            return new JsonResult(
                sampleAdvertisementHistory,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });

        }

        #endregion
    }

}
