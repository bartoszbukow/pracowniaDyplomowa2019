using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.UserViewModels
{
    [Newtonsoft.Json.JsonObject(MemberSerialization.OptOut)]
    public class UserManagementViewModel
    {
        #region Constructor    

        public UserManagementViewModel()
        {

        }

        #endregion

        #region Properties  

        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("surname")]
        public string Surname { get; set; }
        [JsonProperty("flags")]
        public int Flags { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        
        #endregion
    }
}
