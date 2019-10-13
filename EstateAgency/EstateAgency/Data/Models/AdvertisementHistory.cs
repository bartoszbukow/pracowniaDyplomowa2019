using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EstateAgency.Data.Models
{
    public class AdvertisementHistory
    {
        #region Constructor 

        public AdvertisementHistory()
        {

        }

        #endregion

        #region Properties

        [Key] [Required] public string Id { get; set; }
        [Required] public string AdvertisementId { get; set; }
        public string Notes { get; set; }
        [Required] public DateTime CreatedDate { get; set; }

        #endregion

        #region Lazy-Load Properties

        [ForeignKey("AdvertisementId")] 
        public virtual Advertisement Advertisement { get; set; }

        #endregion
    }
}

