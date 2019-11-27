using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels.MessageViewModels;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EstateAgency.Controllers
{
    public class MessageController : BaseApiController
    {
        #region Private Fields 

        private readonly ApplicationDbContext _dbContext;

        #endregion

        #region Constructor    

        public MessageController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
            )
            : base(context, roleManager, userManager, configuration)
        {
            _dbContext = context;
        }

        #endregion Constructor

        #region RESTful conventions methods

        [HttpPost("MessageCreate")]
        [Authorize]
        public async Task<IActionResult> MessageAdd([FromBody] MessageCreateViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            ApplicationUser senderUser = await GetCurrentUserAsync();
            if (senderUser == null) return Unauthorized();

            ApplicationUser recipientUser = await UserManager.FindByEmailAsync(model.RecipientEmail);
            if (recipientUser == null) return BadRequest(106);

            if (model.ConversationId == null)
            {
                Message mess = _dbContext.Messages.FirstOrDefault(m => (m.SenderId == senderUser.Id && m.RecipientId == recipientUser.Id) || (m.SenderId == recipientUser.Id && m.RecipientId == senderUser.Id));
                
                if(mess != null)
                {
                    model.ConversationId = mess.ConversationId;
                }
                else
                {
                    model.ConversationId = Guid.NewGuid().ToString();
                }
            }

            var message = new Message
            {
                Id = Guid.NewGuid().ToString(),
                SenderId = senderUser.Id,
                RecipientId = recipientUser.Id,
                ConversationId = model.ConversationId,
                CreatedDate = DateTime.Now,
                MessageContent = model.MessageContent
            };

            _dbContext.Messages.Add(message);
            _dbContext.SaveChanges();

            return Json(message.Adapt<MessageViewModel>(), JsonSettings);
        }

        [HttpGet("MyMessages")]
        [Authorize]
        public async Task<IActionResult> MyMessages()
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            var messages = _dbContext.Messages.Where(m => m.RecipientId == requestUser.Id || m.SenderId == requestUser.Id);
            var messageInGroup = messages.GroupBy(m => m.ConversationId).Select(g => g.OrderBy(x => x.CreatedDate));
            var latestMessageFromGroups = (from b in messageInGroup select b.Last()).ToList();

            foreach (var message in latestMessageFromGroups)
            {
                message.SenderId = _dbContext.Users.FirstOrDefault(u => u.Id == message.SenderId).Name;
            }

            return  new JsonResult(latestMessageFromGroups.Adapt<MessageListViewModel[]>(), JsonSettings);
        }

        [HttpGet("Conversation{conversationId}")]
        [Authorize]
        public async Task<IActionResult> Conversation(string conversationId)
        {
            ApplicationUser requestUser = await GetCurrentUserAsync();
            if (requestUser == null)
            {
                return Unauthorized();
            }

            var messages = _dbContext.Messages.Where(m => m.ConversationId == conversationId).OrderBy(m => m.CreatedDate);

            var messagesInConversation = messages.Adapt<MessageInConversationViewModel[]>();

            foreach (var message in messagesInConversation)
            {
                message.SenderName = _dbContext.Users.FirstOrDefault(u => u.Id == message.SenderId).Name;
                message.RecipientName = _dbContext.Users.FirstOrDefault(u => u.Id == message.RecipientId).Name;
            }

            return new JsonResult(messagesInConversation.Adapt<MessageInConversationViewModel[]>(), JsonSettings);
        }

        #endregion 
    }
}
