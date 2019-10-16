using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EstateAgency.Data.Models
{
    public class ApplicationUser : IdentityUser

    {
        #region Constructor 

        public ApplicationUser()
        {

        }

        #endregion

        #region Properties

        public string DisplayName { get; set; }
        public string Notes { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        #endregion

        #region Lazy-Load Properties 

        public virtual List<Advertisement> Advertisements { get; set; }
        public virtual List<Reservation> Reservations { get; set; }

        #endregion
    }
}
