using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

                return BadRequest(new { message = "Error, application not sent!" });
            }
            return StatusCode(200, new { message = "Application sent!" });
        }

        [Authorize]
        [HttpGet("all")]
        public IActionResult GetAllApplications()
        {
            List<Application> applications = applicationService.GetAllApplications();
            if (applications == null)
            {
                return StatusCode(204);
            }

            return StatusCode(200, applications);
        }

        [Authorize]
        [HttpPost("action/{id}")]
        public IActionResult AcceptApplication(int id)
        {
            if (applicationService.AcceptApplication(id) < 1)
            {
                return BadRequest(new { message = "Error, application not accepted!" });
            }
            return StatusCode(200,new { message = "Accepted" });
        }

        [Authorize]
        [HttpDelete("action/{id}")]
        public IActionResult DeleteApplication(int id)
        {      
            if (applicationService.DeleteApplication(id) < 1)
            {
                return BadRequest(new { message = "Error, application not deleted!" });
            }
            return StatusCode(200, new { message = "Deleted" });
        }
    }

}
