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
        
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("surname")]
        public string Surname { get; set; }
        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        #endregion
    }
}
