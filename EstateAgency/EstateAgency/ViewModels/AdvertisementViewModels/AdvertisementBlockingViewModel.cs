using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.AdvertisementViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdvertisementBlockingViewModel
    {
        #region Constructor    

        public AdvertisementBlockingViewModel()
        {

        }

        #endregion

        #region Properties  

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("management")]
        public string Management { get; set; }

        #endregion
    }
}
