using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.UserViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserChangePasswordViewModel
    {
        #region Constructor    

        public UserChangePasswordViewModel()
        {

        }

        #endregion

        #region Properties  

        [JsonProperty("oldPassword")]
        public string OldPassword { get; set; }
        [JsonProperty("newPassword")]
        public string NewPassword { get; set; }

        #endregion
    }
}
