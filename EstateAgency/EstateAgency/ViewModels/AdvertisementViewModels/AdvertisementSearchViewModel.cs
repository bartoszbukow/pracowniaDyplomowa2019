using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.AdvertisementViewModels
{
    public class AdvertisementSearchViewModel
    {
        #region Properties
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("yardageTo")]
        public string YardageTo { get; set; }

        [JsonProperty("yardageFrom")]
        public string YardageFrom { get; set; }

        [JsonProperty("priceTo")]
        public string PriceTo { get; set; }

        [JsonProperty("priceFrom")]
        public string PriceFrom { get; set; }

        [JsonProperty("type")]
        public int Type { get; set; }

        [JsonProperty("maxRecord")]
        public int MaxRecords { get; set; }

        [JsonProperty("pageNumber")]
        public int PageNumber { get; set; }
        #endregion
    }
}
