using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.UserViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserCurrentViewModel
    {
        #region Constructor    

        public UserCurrentViewModel()
        {

        }

        #endregion

        #region Properties  

        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("surname")]
        public string Surname { get; set; }

        #endregion
    }
}
