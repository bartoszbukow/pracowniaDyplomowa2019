using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data.Models;
using Newtonsoft.Json;

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdvertisementViewModel
    {
        #region Constructor

        public AdvertisementViewModel()
        {

        }

        #endregion

        #region Properties

        [JsonProperty("id")]
        public string Id { get; set; }                   

        [JsonProperty("title")]
        public string Title { get; set; }              

        [JsonProperty("description")]
        public string Description { get; set; }         

        [JsonProperty("price")]
        public double Price { get; set; }              

        [JsonProperty("yardage")]
        public double Yardage { get; set; }           

        [JsonProperty("category")]
        public string Category { get; set; }           

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }       

        [JsonProperty("lastModifiedDate")]
        public DateTime LastModifiedDate { get; set; }  

        [JsonProperty("type")]
        [DefaultValue(0)] 
        public int Type { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("numberOfRoom")]
        public int NumberOfRoom { get; set; }

        //[JsonProperty("rent")]
        //public int? Rent { get; set; }

        [JsonProperty("images")]
        public virtual List<ImageViewModel> Images { get; set; }

        #endregion
    }
}


