using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.AdvertisementViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdvertisementManagementViewModel
    {
        #region Constructor

        public AdvertisementManagementViewModel()
        {

        }

        #endregion

        #region Properties

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty("type")]
        [DefaultValue(0)]
        public int Type { get; set; }

        [JsonProperty("flag")]
        public int Flag { get; set; }

        [JsonProperty("images")]
        public virtual List<ImageViewModel> Images { get; set; }

        #endregion
    }
}
