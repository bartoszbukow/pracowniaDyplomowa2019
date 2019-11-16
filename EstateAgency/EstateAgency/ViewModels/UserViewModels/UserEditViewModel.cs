using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.UserViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserEditViewModel
    {
        #region Constructor    
        
        public UserEditViewModel()
        {

        }

        #endregion

        #region Properties  
        
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("displayName")]
        public string DisplayName { get; set; }
        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        #endregion
    }
}
