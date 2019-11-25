using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.ViewModels.MessageViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class MessageListViewModel
    {
        #region Constructor

        public MessageListViewModel()
        {

        }

        #endregion

        #region Properties

        [JsonProperty("senderName")]
        public string SenderId { get; set; }

        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }

        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty("messageContent")]
        public string MessageContent { get; set; }

        #endregion
    }
}
