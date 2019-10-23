using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ImageViewModel
    {
        #region Constructor 

        public ImageViewModel()
        {

        }

        #endregion

        #region Properties   

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("advertisementId")]
        public string AdvertisementId { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        #endregion
    }
}

