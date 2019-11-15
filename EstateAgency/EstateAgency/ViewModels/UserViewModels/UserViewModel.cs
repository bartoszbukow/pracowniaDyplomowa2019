using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserViewModel
    {
        #region Constructor     
        public UserViewModel()
        {

        }
        #endregion

        #region Properties    
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("displayName")]
        public string DisplayName { get; set; }
        #endregion
    }
}
