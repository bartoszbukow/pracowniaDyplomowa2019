﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EstateAgency.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenRequestViewModel
    {
        #region Constructor 
        public TokenRequestViewModel()
        {

        }
        #endregion

        #region Properties    
        public string grant_type { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        #endregion
    }
}
