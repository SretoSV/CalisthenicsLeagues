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
        private static readonly UserService userService = new UserService();

        [HttpGet("leagues")]
        public IActionResult GetLeagues()
        {
            List<League> leagues = leagueService.FindAll();
            return StatusCode(200, leagues);
        }

        [HttpGet("members/{id}")]
        public IActionResult GetLeagueMembers(int id)
        {
            List<User> members = userService.GetLeagueMembers(id);
            return StatusCode(200, members);
        }
    }
}
