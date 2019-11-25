using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EstateAgency.ViewModels.MessageViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class MessageViewModel 
    {
        #region Constructor

        public MessageViewModel()
        {

        }

        #endregion

        #region Properties

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("senderId")]
        public string SenderId { get; set; }

        [JsonProperty("recipientId")]
        public string RecipientId { get; set; }

        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }

        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty("messageContent")]
        public string MessageContent { get; set; }

        #endregion
    }
}
