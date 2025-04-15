using System.Security.Claims;
using System.Threading.Tasks;
using CalisthenicsLeagues.Controllers;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service.Interfaces;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CalisthenicsLeagues.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly UserController _controller;
        private readonly IUserService _userService;

        public UserControllerTests()
        {
            _userService = A.Fake<IUserService>();
            _controller = new UserController(_userService);

            var services = new ServiceCollection();
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();
            var serviceProvider = services.BuildServiceProvider();

            var context = new DefaultHttpContext { RequestServices = serviceProvider };
            _controller.ControllerContext = new ControllerContext { HttpContext = context };
        }

        #region PostData Tests
        /*[Fact]
        public async Task PostData_ShouldReturnUser_WhenCredentialsAreCorrect()
        {
            // Arrange
            var loginRequest = new LoginRequest { Email = "test@test.com", Password = "password" };
            var user = new User { Id = 1, Email = "test@test.com", Username = "testUser" };
            A.CallTo(() => _userService.GetUserByEmailAndPassword(loginRequest)).Returns(user);

            // Act
            var result = await _controller.PostData(loginRequest) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(200);
            var returnedUser = result.Value as User;
            returnedUser.Should().NotBeNull();
            returnedUser!.Email.Should().Be(user.Email);
        }*/

        [Fact]
        public async Task PostData_ShouldReturnBadRequest_WhenCredentialsAreInvalid()
        {
            // Arrange
            var loginRequest = new LoginRequest { Email = "test@test.com", Password = "wrongpassword" };
            A.CallTo(() => _userService.GetUserByEmailAndPassword(loginRequest)).Returns(null);

            // Act
            var result = await _controller.PostData(loginRequest) as BadRequestObjectResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(400);
        }
        #endregion

        #region Logout Tests
        /*[Fact]
        public async Task Logout_ShouldReturnOk_WhenUserIsLoggedOut()
        {
            // Act
            var result = await _controller.Logout() as OkObjectResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(200);
            result.Value.Should().Be("Logged out successfully!");
        }*/
        #endregion

        #region PasswordReset Tests
        [Fact]
        public void PasswordReset_ShouldReturnOk_WhenPasswordIsUpdated()
        {
            // Arrange
            var resetRequest = new PasswordResetRequest { Email = "test@test.com", OldPassword = "oldpassword", NewPassword = "newpassword" };
            A.CallTo(() => _userService.UpdatePassword(resetRequest)).Returns(true);

            // Act
            var result = _controller.PasswordReset(resetRequest) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(200);
        }

        [Fact]
        public void PasswordReset_ShouldReturnBadRequest_WhenPasswordUpdateFails()
        {
            // Arrange
            var resetRequest = new PasswordResetRequest { Email = "test@test.com", OldPassword = "oldpassword", NewPassword = "newpassword" };
            A.CallTo(() => _userService.UpdatePassword(resetRequest)).Returns(false);

            // Act
            var result = _controller.PasswordReset(resetRequest) as BadRequestObjectResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(400);
        }
        #endregion

        #region GetMe Tests
        [Fact]
        public void GetMe_ShouldReturnUser_WhenUserExists()
        {
            // Arrange
            var user = new User { Username = "testUser", Email = "test@test.com" };
            var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Username) });
            _controller.ControllerContext.HttpContext.User = new ClaimsPrincipal(identity);
            A.CallTo(() => _userService.GetUserByUsername(user.Username)).Returns(user);

            // Act
            var result = _controller.GetMe() as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(200);
            var returnedUser = result.Value as User;
            returnedUser.Should().NotBeNull();
            returnedUser!.Email.Should().Be(user.Email);
        }

        [Fact]
        public void GetMe_ShouldReturnNoContent_WhenUserDoesNotExist()
        {
            // Arrange
            A.CallTo(() => _userService.GetUserByUsername(A<string>.Ignored)).Returns(null);

            // Act
            var result = _controller.GetMe() as StatusCodeResult;

            // Assert
            result.Should().NotBeNull();
            result!.StatusCode.Should().Be(204);
        }
        #endregion
    }
}
