using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdvertisementHistoryViewModel : Controller
    {
        #region Constructor  
        
        public AdvertisementHistoryViewModel()
        {

        }

        #endregion

        #region Properties   

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("advertisementId")]
        public string AdvertisementId { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("createdDate")]
        [JsonIgnore] 
        public DateTime CreatedDate { get; set; }

        #endregion   
    
    }
}
