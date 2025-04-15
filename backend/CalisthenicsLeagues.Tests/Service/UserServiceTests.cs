using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using FakeItEasy;
using FluentAssertions;
using Xunit;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CalisthenicsLeagues.Tests.Service
{
    public class UserServiceTests
    {
        private readonly UserService _userService;
        private readonly IUserDAO _userDAO;
        private readonly PasswordHasher<string> _passwordHasher;

        public UserServiceTests()
        {
            _userDAO = A.Fake<IUserDAO>();
            _passwordHasher = new PasswordHasher<string>();
            _userService = new UserService(_userDAO);
        }

        #region GetUserByEmailAndPassword Tests
        [Fact]
        public void GetUserByEmailAndPassword_ShouldReturnUser_WhenPasswordIsCorrect()
        {
            // Arrange
            var loginRequest = new LoginRequest { Email = "test@test.com", Password = "password123" };
            var hashedPassword = _passwordHasher.HashPassword(null, "password123");

            A.CallTo(() => _userDAO.GetPasswordByEmail(loginRequest.Email)).Returns(hashedPassword);
            A.CallTo(() => _userDAO.GetUserByEmailAndPassword(loginRequest)).Returns(new User { Id = 1, Email = "test@test.com" });

            // Act
            var result = _userService.GetUserByEmailAndPassword(loginRequest);

            // Assert
            result.Should().NotBeNull();
            result.Email.Should().Be("test@test.com");
        }

        [Fact]
        public void GetUserByEmailAndPassword_ShouldReturnNull_WhenPasswordIsIncorrect()
        {
            // Arrange
            var loginRequest = new LoginRequest { Email = "test@example.com", Password = "wrongpassword" };
            var password = "correctpassword";
            var hashedPassword = _passwordHasher.HashPassword(null, password);

            A.CallTo(() => _userDAO.GetPasswordByEmail(loginRequest.Email)).Returns(hashedPassword);

            // Act
            var result = _userService.GetUserByEmailAndPassword(loginRequest);

            // Assert
            result.Should().BeNull();
        }
        #endregion

        #region GetUserByUsername Tests
        [Fact]
        public void GetUserByUsername_ShouldReturnUser_WhenUsernameExists()
        {
            // Arrange
            var username = "testUser";
            var user = new User { Id = 1, Username = username };
            A.CallTo(() => _userDAO.GetUserByUsername(username)).Returns(user);

            // Act
            var result = _userService.GetUserByUsername(username);

            // Assert
            result.Should().NotBeNull();
            result.Username.Should().Be(username);
        }
        #endregion

        #region UpdatePassword Tests
        [Fact]
        public void UpdatePassword_ShouldReturnTrue_WhenPasswordIsUpdatedSuccessfully()
        {
            // Arrange
            var passwordResetRequest = new PasswordResetRequest { Email = "test@test.com", OldPassword = "oldpassword", NewPassword = "newpassword123" };
            A.CallTo(() => _userDAO.ExistsByEmailAndPassword(passwordResetRequest)).Returns(true);
            A.CallTo(() => _userDAO.UpdatePassword(passwordResetRequest)).Returns(1);

            // Act
            var result = _userService.UpdatePassword(passwordResetRequest);

            // Assert
            result.Should().BeTrue();
        }
        
        [Fact]
        public void UpdatePassword_ShouldReturnFalse_WhenUserDoesNotExist()
        {
            // Arrange
            var passwordResetRequest = new PasswordResetRequest { Email = "test@test.com", OldPassword = "wrongpassword", NewPassword = "newpassword123" };
            A.CallTo(() => _userDAO.ExistsByEmailAndPassword(passwordResetRequest)).Returns(false);

            // Act
            var result = _userService.UpdatePassword(passwordResetRequest);

            // Assert
            result.Should().BeFalse();
        }
        #endregion

        #region UpdateProfile Tests
        [Fact]
        public void UpdateProfile_ShouldReturnTrue_WhenProfileIsUpdatedSuccessfully()
        {
            // Arrange
            var user = new User { Id = 1, Image = "NoPicture" };
            A.CallTo(() => _userDAO.UpdateProfile(user)).Returns(1);
            A.CallTo(() => _userDAO.GetPictureById(user.Id)).Returns("placeholderPicture.jpg");

            // Act
            var result = _userService.UpdateProfile(user);

            // Assert
            result.Should().BeTrue();
            user.Image.Should().Be("placeholderPicture.jpg");
        }

        [Fact]
        public void UpdateProfile_ShouldReturnFalse_WhenProfileUpdateFails()
        {
            // Arrange
            var user = new User { Id = 1, Image = "NoPicture" };
            A.CallTo(() => _userDAO.UpdateProfile(user)).Returns(0);
            A.CallTo(() => _userDAO.GetPictureById(user.Id)).Returns("placeholderPicture.jpg");

            // Act
            var result = _userService.UpdateProfile(user);

            // Assert
            result.Should().BeFalse();
        }
        #endregion

        #region GetLeagueMembers Tests
        [Fact]
        public void GetLeagueMembers_ShouldReturnListOfMembers_WhenLeagueIdExists()
        {
            // Arrange
            var leagueId = 1;
            var members = new List<User>
            {
                new User { Id = 1, Username = "user1" },
                new User { Id = 2, Username = "user2" }
            };
            A.CallTo(() => _userDAO.FindAllByLeagueId(leagueId)).Returns(members);

            // Act
            var result = _userService.GetLeagueMembers(leagueId);

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2);
        }
        #endregion

        #region FillUserFields Tests
        [Fact]
        public void FillUserFields_ShouldReturnCorrectUser_WhenDataIsProvided()
        {
            // Arrange
            var editProfileRequest = new EditProfileRequest
            {
                Id = "1",
                Username = "testUser",
                Name = "Test",
                Surname = "User",
                Country = "Country",
                DateOfBirth = "1990-01-01",
                Email = "test@test.com",
                Instagram = "test_insta",
                League = "1"
            };
            var relativeFilePath = "Images/testUser.jpg";

            // Act
            var result = _userService.FillUserFields(editProfileRequest, relativeFilePath);

            // Assert
            result.Should().NotBeNull();
            result.Username.Should().Be("testUser");
            result.Image.Should().Be("Images/testUser.jpg");
            result.League.Should().Be(1);
        }
        #endregion

        #region GetUserDataForProfileEdit Tests
        [Fact]
        public async Task GetUserDataForProfileEdit_ShouldReturnUser_WhenProfileImageIsProvided()
        {
            // Arrange
            var editProfileRequest = new EditProfileRequest
            {
                Id = "1",
                Username = "testUser",
                Name = "Test",
                Surname = "User",
                Country = "Country",
                DateOfBirth = "1990-01-01",
                Email = "test@test.com",
                Instagram = "test_insta",
                League = "1",
                ProfileImage = A.Fake<IFormFile>()
            };

            // Act
            var result = await _userService.GetUserDataForProfileEdit(editProfileRequest);

            // Assert
            result.Should().NotBeNull();
            result.Image.Should().NotBe("NoPicture");
        }
        #endregion
    }
}