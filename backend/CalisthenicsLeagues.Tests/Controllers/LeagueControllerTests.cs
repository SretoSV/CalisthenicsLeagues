using CalisthenicsLeagues.Controllers;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service.Interfaces;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace CalisthenicsLeagues.Tests.Controllers
{
    public class LeagueControllerTests
    {
        private readonly ILeagueService _leagueService;
        private readonly IUserService _userService;
        private readonly LeagueController _controller;

        public LeagueControllerTests()
        {
            _leagueService = A.Fake<ILeagueService>();
            _userService = A.Fake<IUserService>();
            _controller = new LeagueController(_leagueService, _userService);
        }

        #region GetLeagues Tests

        [Fact]
        public void GetLeagues_ShouldReturnLeagues_WhenLeaguesExist()
        {
            // Arrange
            var leagues = new List<League> { new League { Id = 1, Name = "Legendary" } };
            A.CallTo(() => _leagueService.FindAll()).Returns(leagues);

            // Act
            var result = _controller.GetLeagues() as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result?.StatusCode.Should().Be(200);
            result?.Value.Should().BeEquivalentTo(leagues);
        }

        [Fact]
        public void GetLeagues_ShouldReturnEmptyList_WhenNoLeaguesExist()
        {
            // Arrange
            A.CallTo(() => _leagueService.FindAll()).Returns(new List<League>());

            // Act
            var result = _controller.GetLeagues() as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result?.StatusCode.Should().Be(200);
            result?.Value.Should().BeEquivalentTo(new List<League>());
        }

        #endregion

        #region GetLeagueMembers Tests

        [Fact]
        public void GetLeagueMembers_ShouldReturnMembers_WhenMembersExist()
        {
            // Arrange
            var members = new List<User> { new User { Id = 1, Username = "testUser" } };
            A.CallTo(() => _userService.GetLeagueMembers(1)).Returns(members);

            // Act
            var result = _controller.GetLeagueMembers(1) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result?.StatusCode.Should().Be(200);
            result?.Value.Should().BeEquivalentTo(members);
        }

        [Fact]
        public void GetLeagueMembers_ShouldReturnEmptyList_WhenNoMembersExist()
        {
            // Arrange
            A.CallTo(() => _userService.GetLeagueMembers(1)).Returns(new List<User>());

            // Act
            var result = _controller.GetLeagueMembers(1) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result?.StatusCode.Should().Be(200);
            result?.Value.Should().BeEquivalentTo(new List<User>());
        }

        #endregion

        #region GetNumberOfLeagueMembers Tests

        [Fact]
        public void GetNumberOfLeagueMembers_ShouldReturnCorrectCount()
        {
            // Arrange
            var members = new List<User> { new User { Id = 1 }, new User { Id = 2 } };
            A.CallTo(() => _userService.GetLeagueMembers(1)).Returns(members);

            // Act
            var result = _controller.GetNumberOfLeagueMembers(1) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result?.StatusCode.Should().Be(200);
            result?.Value.Should().Be(2);
        }

        [Fact]
        public void GetNumberOfLeagueMembers_ShouldReturnZero_WhenNoMembersExist()
        {
            // Arrange
            A.CallTo(() => _userService.GetLeagueMembers(1)).Returns(new List<User>());

            // Act
            var result = _controller.GetNumberOfLeagueMembers(1) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result?.StatusCode.Should().Be(200);
            result?.Value.Should().Be(0);
        }

        #endregion
    }
}