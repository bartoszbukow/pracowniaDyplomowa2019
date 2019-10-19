using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EstateAgency.Data.Models
{
    public class Token
    {
        #region Constructor   
        public Token()
        {
        }
        #endregion

        #region Properties 
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string ClientId { get; set; }
        [Required]
        public string Value { get; set; }
        public int Type { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region Lazy-Load Properties
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
        #endregion
    }
}

