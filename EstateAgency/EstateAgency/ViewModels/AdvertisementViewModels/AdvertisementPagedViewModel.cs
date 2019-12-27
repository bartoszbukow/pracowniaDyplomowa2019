using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.AdvertisementViewModels
{
    public class AdvertisementPagedViewModel
    {

        [JsonProperty("advertisements")]
        public List<AdvertisementViewModel> Advertisements { get; set; }

        [JsonProperty("pageCount")]
        public int PageCount { get; set; }
    }
}
