using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private static readonly ApplicationService applicationService = new ApplicationService();

        [HttpPost("apply")]
        public IActionResult Apply([FromBody] Application application)
        {
            if (applicationService.InsertNewApplication(application) == false) {

                return BadRequest(new { message = "Username already exists!" });
            }
            return StatusCode(200, new { message = "Application sent!" });
        }
    }
}
