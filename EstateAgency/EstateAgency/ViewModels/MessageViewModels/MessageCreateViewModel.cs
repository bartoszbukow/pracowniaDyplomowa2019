using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EstateAgency.ViewModels.MessageViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class MessageCreateViewModel
    {
        #region Constructor

        public MessageCreateViewModel()
        {

        }

        #endregion

        #region Properties

        [JsonProperty("recipientEmail")]
        public string RecipientEmail { get; set; }

        [JsonProperty("messageContent")]
        public string MessageContent { get; set; }

        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }

        #endregion
    }
}
