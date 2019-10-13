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
    public class Reservation
    {
        #region Constructor 

        public Reservation()
        {

        }

        #endregion

        #region Properties

        [Key] [Required] public string Id { get; set; }
        public string UserId { get; set; }
        public string AdvertisementId { get; set; }
        [Required] [DefaultValue(0)] public int ReservationActive { get; set; }
        [Required] public DateTime CreatedDate { get; set; }
        [Required] public DateTime ReservationTo { get; set; }
        [Required] public DateTime ReservationFrom { get; set; }

        #endregion

        #region Lazy-Load Properties

        [ForeignKey("AdvertisementId")] 
        public virtual Advertisement Advertisement { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        #endregion
    }
}

