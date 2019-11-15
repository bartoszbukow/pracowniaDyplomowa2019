using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdvertisementDeleteViewModel
    {
        [JsonProperty("id")]
        public String Id { get; set; }
    }
}
