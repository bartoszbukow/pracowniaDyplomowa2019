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
    public class Advertisement
    {
        #region Constructor 

        public Advertisement()
        {

        }

        #endregion

        #region Properties

        [Key][Required] public string Id { get; set; }
        [Required] public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Yardage { get; set; }
        public string Category { get; set; }
        [Required] public string UserId { get; set; }
        [Required] public DateTime CreatedDate { get; set; }
        [Required] public DateTime LastModifiedDate { get; set; }
        [DefaultValue(0)] public int Type { get; set; }

        #endregion

        #region Lazy-Load Properties 

        [ForeignKey("UserId")] 
        public virtual ApplicationUser User { get; set; }
        public virtual List<AdvertisementHistory> AdvertisementHistorys { get; set; }
        public virtual List<Reservation> Reservations { get; set; }
        public virtual List<Image> Images { get; set; }

        #endregion

    }
}
