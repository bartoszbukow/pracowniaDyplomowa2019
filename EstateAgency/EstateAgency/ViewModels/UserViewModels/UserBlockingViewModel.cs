using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.UserViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserBlockingViewModel
    {
        #region Constructor    

        public UserBlockingViewModel()
        {

        }

        #endregion

        #region Properties  

        [JsonProperty("id")]
        public string Id { get; set; }

        #endregion
    }
}
