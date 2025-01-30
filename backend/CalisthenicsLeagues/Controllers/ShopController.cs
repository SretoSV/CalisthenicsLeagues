using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private static readonly ShirtService shirtService = new ShirtService();

        [HttpGet("shirts")]
        public IActionResult GetShirts()
        {
            List<Shirt> leagues = shirtService.FindAll();
            return StatusCode(200, leagues);
        }
    }
}
