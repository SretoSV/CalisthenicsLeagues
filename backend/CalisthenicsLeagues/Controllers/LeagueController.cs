using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using CalisthenicsLeagues.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private readonly ILeagueService leagueService;
        private readonly IUserService userService;
        public LeagueController(ILeagueService lService, IUserService uService) {
            leagueService = lService;
            userService = uService;
        }
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

        [HttpGet("members/number/{id}")]
        public IActionResult GetNumberOfLeagueMembers(int id)
        {
            List<User> members = userService.GetLeagueMembers(id);
            return StatusCode(200, members.Count);
        }
    }
}
