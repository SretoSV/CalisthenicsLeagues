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
using Org.BouncyCastle.Asn1.Ocsp;

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
            if (!userService.UpdatePassword(data))
            {
                return BadRequest("Wrong password.");
            }

            return StatusCode(200, "Password reset successful!");
        }

        [Authorize]
        [HttpPost("edit")]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileRequest data)
        {
            User user = new User();

            if (data.ProfileImage != null)
            {
                Console.WriteLine("Picture");

                var uploadPath = Path.Combine("wwwroot", "Images");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(data.ProfileImage.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await data.ProfileImage.CopyToAsync(fileStream);
                }

                var relativeFilePath = Path.Combine("Images", fileName);

                user = userService.FillUserFields(data, relativeFilePath);
                Console.WriteLine(filePath + "\n" + relativeFilePath);
            }
            else {
                user = userService.FillUserFields(data, "Images/placeHolder.png");
                Console.WriteLine("No picture");
            }

            if (!userService.UpdateProfile(user))
            {
                return BadRequest("Not updated.");
            }

            return StatusCode(200, user);
        }

        //var userEmail = User.Identity?.Name;

    }
}
