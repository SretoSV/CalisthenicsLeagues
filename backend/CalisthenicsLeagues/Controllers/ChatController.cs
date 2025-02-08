using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private static readonly ChatService chatService = new ChatService();

        [Authorize]
        [HttpGet("all/{leagueId}")]
        public IActionResult GetAllApplications(int leagueId)
        {
            List<MessageRequest> messages = chatService.GetAllMessagesByLeague(leagueId);
            if (messages == null)
            {
                return StatusCode(204);
            }

            return StatusCode(200, messages);
        }
    }
}
