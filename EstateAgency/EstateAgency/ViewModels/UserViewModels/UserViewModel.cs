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
        
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("surname")]
        public string Surname { get; set; }
        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        #endregion
    }
}
