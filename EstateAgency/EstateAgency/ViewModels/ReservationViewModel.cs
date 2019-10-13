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
    public class ReservationViewModel : Controller
    {
        #region Constructor 
        
        public ReservationViewModel()
        {

        }

        #endregion

        #region Properties   

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("advertisementId")]
        public string AdvertisementId { get; set; }

        [JsonProperty("reservationActive")]
        [DefaultValue(0)] public int ReservationActive { get; set; }

        [JsonProperty("createdDate")]
        [JsonIgnore] public DateTime CreatedDate { get; set; }

        [JsonProperty("reservationTo")]
        public DateTime ReservationTo { get; set; }

        [JsonProperty("reservationFrom")]
        public DateTime ReservationFrom { get; set; }

        #endregion
    }
}
