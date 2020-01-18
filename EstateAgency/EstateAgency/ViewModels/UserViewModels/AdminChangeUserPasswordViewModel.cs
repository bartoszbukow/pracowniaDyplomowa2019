using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.UserViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AdminChangeUserPasswordViewModel
    {
        #region Constructor    

        public AdminChangeUserPasswordViewModel()
        {

        }

        #endregion

        #region Properties  

        [JsonProperty("userId")]
        public string UserId { get; set; }
        [JsonProperty("newPassword")]
        public string NewPassword { get; set; }

        #endregion
    }
}
