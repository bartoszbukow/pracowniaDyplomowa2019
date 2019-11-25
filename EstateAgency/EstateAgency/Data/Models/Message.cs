using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.Data.Models
{
    public class Message
    {
        #region Constructor 

        public Message()
        {

        }

        #endregion

        #region Properties

        [Key][Required] public string Id { get; set; }
        public string SenderId { get; set; }
        public string RecipientId { get; set; }
        [Required] public string ConversationId { get; set; }
        [Required] public DateTime CreatedDate { get; set; }
        public string MessageContent { get; set; }

        #endregion

        #region Lazy-Load Properties 

        [ForeignKey("SenderId")]
        public virtual ApplicationUser Sender { get; set; }
        [ForeignKey("RecipientId")]
        public virtual ApplicationUser Recipient { get; set; }
        
        #endregion
    }
}
