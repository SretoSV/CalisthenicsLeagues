using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private static readonly LeagueService leagueService = new LeagueService();

        [HttpGet("leagues")]
        public IActionResult GetLeagues()
        {
            List<League> leagues = leagueService.FindAll();
            //User user = userService.GetUserByUsername(User.Identity?.Name);
            //user.Password = "";
            return StatusCode(200, leagues);
        }

    }
}
