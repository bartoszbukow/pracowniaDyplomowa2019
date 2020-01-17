using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.AdvertisementViewModels
{
    public class PagingDataViewModel
    {
        #region Properties
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("yardageTo")]
        public double YardageTo { get; set; }

        [JsonProperty("yardageFrom")]
        public double YardageFrom { get; set; }

        [JsonProperty("priceTo")]
        public double PriceTo { get; set; }

        [JsonProperty("priceFrom")]
        public double PriceFrom { get; set; }

        [JsonProperty("type")]
        public int Type { get; set; }

        [JsonProperty("maxRecord")]
        public int MaxRecords { get; set; }

        [JsonProperty("pageNumber")]
        public int PageNumber { get; set; }
        #endregion
    }
}
