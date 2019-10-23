using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.Data.Models
{
    public class Image
    {
        #region Constructor 

        public Image()
        {

        }

        #endregion

        #region Properties

        [Key] [Required] public string Id { get; set; }
        public string AdvertisementId { get; set; }
        [Required] public string Path { get; set; }

        #endregion

        #region Lazy-Load Properties

        [ForeignKey("AdvertisementId")]
        public virtual Advertisement Advertisement { get; set; }

        #endregion
    }
}
