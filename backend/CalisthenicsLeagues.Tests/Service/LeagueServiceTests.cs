using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using FakeItEasy;
using FluentAssertions;
using Xunit;
using System.Collections.Generic;

namespace CalisthenicsLeagues.Tests.Service
{
    public class LeagueServiceTests
    {
        private readonly LeagueService _leagueService;
        private readonly ILeagueDAO _leagueDAO;

        public LeagueServiceTests()
        {
            _leagueDAO = A.Fake<ILeagueDAO>();
            _leagueService = new LeagueService(_leagueDAO);
        }

        #region FindAll Tests
        [Fact]
        public void FindAll_ShouldReturnListOfLeagues_WhenLeaguesExist()
        {
            // Arrange
            var fakeLeagues = new List<League>
            {
                new League { Id = 1, Name = "Legendary" },
                new League { Id = 2, Name = "Legendary" }
            };

            A.CallTo(() => _leagueDAO.FindAll()).Returns(fakeLeagues);

            // Act
            var result = _leagueService.FindAll();

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2);
            result.Should().BeEquivalentTo(fakeLeagues);
        }

        [Fact]
        public void FindAll_ShouldReturnEmptyList_WhenNoLeaguesExist()
        {
            // Arrange
            A.CallTo(() => _leagueDAO.FindAll()).Returns(new List<League>());

            // Act
            var result = _leagueService.FindAll();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty();
        }
        #endregion
    }
}
