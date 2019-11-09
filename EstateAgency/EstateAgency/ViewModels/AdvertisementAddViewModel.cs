using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdvertisementAddViewModel
    {
        #region Constructor

        public AdvertisementAddViewModel()
        {

        }

        #endregion

        #region Properties

        [Newtonsoft.Json.JsonProperty("id")]
        public string Id { get; set; }                   //id ogloszenia

        [JsonProperty("title")]
        public string Title { get; set; }               // tytul

        [JsonProperty("description")]
        public string Description { get; set; }         //opis

        [JsonProperty("price")]
        public double Price { get; set; }              // cena

        [JsonProperty("yardage")]
        public double Yardage { get; set; }            //metraz

        [JsonProperty("category")]
        public string Category { get; set; }            // kategoria

        [JsonProperty("userId")]
        public string UserId { get; set; }              // id usera

        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }       // data utworzenia

        [JsonProperty("lastModifiedDate")]
        public DateTime LastModifiedDate { get; set; }  // data modyfikacji

        [JsonProperty("type")]
        [DefaultValue(0)]
        public int Type { get; set; } // typ - czy aktywne?

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("numberOfRoom")]
        public int NumberOfRoom { get; set; }

        [JsonProperty("rent")]
        public int? Rent { get; set; }

        //[JsonProperty("photos")]
        //public IFormFile Images { get; set; }

        //[JsonProperty("images")]
        //public virtual List<ImageViewModel> Images { get; set; }

        #endregion
    }
}
