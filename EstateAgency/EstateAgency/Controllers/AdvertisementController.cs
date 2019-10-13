using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data;
using EstateAgency.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EstateAgency.Controllers
{
    [Route("api/[controller]")]
    public class AdvertisementController : Controller
    {
        #region Private Fields 

        private readonly ApplicationDbContext DbContext;

        #endregion

        #region Constructor    

        public AdvertisementController(ApplicationDbContext context)
        {
            // Instantiate the ApplicationDbContext through DI
            DbContext = context;

        }

        #endregion Constructor


        #region RESTful conventions methods

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var quiz = DbContext.Advertisements.FirstOrDefault(i => i.Id == id);

            return new JsonResult(quiz.Adapt<AdvertisementViewModel>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            });
        }

        public IActionResult Put(AdvertisementViewModel m)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Post(AdvertisementViewModel m)
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

        // GET api/advertisement/latest
        [HttpGet("Latest/{num}")]
        public IActionResult Latest(int num = 10)
        {
            var latest = DbContext.Advertisements.OrderByDescending(q => q.CreatedDate).Take(num).ToArray();

            return new JsonResult(latest.Adapt<AdvertisementViewModel[]>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            });
        }

        [HttpGet("ByTitle/{num:int?}")]
        public IActionResult ByTitle(int num = 10)
        {
            var byTitle = DbContext.Advertisements.OrderBy(q => q.Title).Take(num).ToArray();

            return new JsonResult(byTitle.Adapt<AdvertisementViewModel[]>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            });
        }

        [HttpGet("Random/{num:int?}")]
        public IActionResult Random(int num = 10)
        {
            var random = DbContext.Advertisements.OrderBy(q => Guid.NewGuid()).Take(num).ToArray(); 
            
            return new JsonResult(random.Adapt<AdvertisementViewModel[]>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented

            });
        }

        #endregion
    }

}
