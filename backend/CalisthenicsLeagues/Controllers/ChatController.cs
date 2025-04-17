using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using CalisthenicsLeagues.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService chatService;
        public ChatController(IChatService cService)
        {
            chatService = cService;
        }

        [Authorize]
        [HttpGet("all/{leagueId}")]
        public IActionResult GetAllMessages(int leagueId)
        {
            List<MessageRequest> messages = chatService.GetAllMessagesByLeague(leagueId);
            if (messages == null)
            {
                return StatusCode(204);
            }

            return StatusCode(200, messages);
        }
        
        [Authorize]
        [HttpGet("messages")]
        public IActionResult GetLastXMessages(int leagueId, int limit = 30, DateTime? before = null)
        {
            List<MessageRequest> messages = chatService.GetLastXMessagesByLeague(leagueId, limit, before);

            if (messages == null)
            {
                return StatusCode(204);
            }

            return StatusCode(200, messages);
        }

        [Authorize]
        [HttpPost("newMessage")]
        public IActionResult NewMessage([FromBody] CreateMessageRequest createMessageRequest)
        {
            if (DateTime.TryParse(createMessageRequest.Datetime, out DateTime parsedDatetime))
            {
                Message message = new Message();

                message.League = createMessageRequest.League;
                message.Content = createMessageRequest.Content;
                message.Datetime = parsedDatetime;
                message.User = createMessageRequest.User;
                message.IsFile = createMessageRequest.IsFile;
                message.IsDeleted = createMessageRequest.IsDeleted;
                message.HasReply = createMessageRequest.HasReply;

                Message result = chatService.InsertNewMessage(message);
                return result != null ? Ok(result) : BadRequest("Error saving message");
            }
            else
            {
                return BadRequest("Invalid datetime format.");
            }
        }

        [Authorize]
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteMessage(int id)
        {
            if (chatService.DeleteMessage(id) < 1)
            {
                return BadRequest(new { message = "Error, message not deleted!" });
            }
            return StatusCode(200, new { message = "Deleted" });
        }

        [Authorize]
        [HttpPost("edit")]
        public IActionResult EditMessage([FromBody] EditMessageDTO editMessageDTO)
        {
            if (chatService.EditMessage(editMessageDTO) < 1)
            {
                return BadRequest(new { message = "Error, message not edited!" });
            }
            return StatusCode(200, new { message = "Edited" });
        }
    }
}
