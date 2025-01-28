using System.Security.Claims;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static readonly UserService userService = new UserService();

        [HttpPost("login")]
        public async Task<IActionResult> PostData([FromBody] LoginRequest data)
        {
            Console.WriteLine("Password:" + data.Password + " Email:" + data.Email);

            User user = userService.GetUserByEmailAndPassword(data);

            if (user == null)
            {
                return BadRequest("Wrong email or password.");
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
            if (!userService.UpdatePassword(data)) {
                return BadRequest("Wrong password.");
            }

            return StatusCode(200, "Password reset successful!");
        }

        //var userEmail = User.Identity?.Name;

    }
}
