using System.Security.Claims;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using CalisthenicsLeagues.Service.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService uService) { 
            userService = uService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> PostData([FromBody] LoginRequest data)
        {
            User user = userService.GetUserByEmailAndPassword(data);

            if (user == null)
            {
                return BadRequest(new { message = "Wrong email or password, or your application is still in the review process." });
            }
            user.Password = "";

            #region SetCookie
            //Kreiranje claims za korisnika
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.DateOfBirth , user.DateOfBirth.ToString()),
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            // Postavi kolačić za korisnika (sesija)
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
            #endregion

            return StatusCode(200, user);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            //Brisanje kolacica
            await HttpContext.SignOutAsync("Cookies");
            return Ok("Logged out successfully!");
        }

        [HttpPost("passwordreset")]
        public IActionResult PasswordReset([FromBody] PasswordResetRequest data)
        {
            Console.WriteLine("A: " + data.Email + "B: " + data.OldPassword + "C:" + data.NewPassword);
            if (!userService.UpdatePassword(data))
            {
                return BadRequest( new { message = "Wrong password." });
            }

            return StatusCode(200, new { message = "Password reset successful!" });
        }

        [Authorize]
        [HttpPost("edit")]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileRequest data)
        {
            User user = await userService.GetUserDataForProfileEdit(data);

            if (!userService.UpdateProfile(user))
            {
                return BadRequest("Not updated.");
            }

            return StatusCode(200, user);
        }

        [HttpGet("me")]
        public IActionResult GetMe()
        {
            User user = userService.GetUserByUsername(User.Identity?.Name);
            if (user == null)
            {
                Console.WriteLine("NoContent");
                return StatusCode(204);
            }

            user.Password = "";
            return StatusCode(200, user);
        }

        [Authorize]
        [HttpGet("session-check")]
        public IActionResult CheckSession()
        {
            return Ok(new { message = "Session is active" });
        }

        //var userEmail = User.Identity?.Name;

    }
}
