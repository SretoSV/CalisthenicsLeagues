using CalisthenicsLeagues.Service;
using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.Models;
using FakeItEasy;
using FluentAssertions;
using Xunit;

namespace CalisthenicsLeagues.Tests
{
    public class ApplicationServiceTests
    {
        private readonly ApplicationService _service;
        private readonly IApplicationDAO _applicationDAO;
        private readonly IUserDAO _userDAO;

        public ApplicationServiceTests()
        {
            _applicationDAO = A.Fake<IApplicationDAO>();
            _userDAO = A.Fake<IUserDAO>();
            _service = new ApplicationService(_userDAO, _applicationDAO);
        }

        #region InsertNewApplication Tests

        [Fact]
        public void InsertNewApplication_ShouldReturnTrue_WhenInsertIsSuccessful()
        {
            // Arrange
            var application = new Application { Username = "user1", Password = "password" };
            A.CallTo(() => _applicationDAO.InsertNewApplication(A<Application>.Ignored)).Returns(1);

            // Act
            var result = _service.InsertNewApplication(application);

            // Assert
            result.Should().BeTrue();
            A.CallTo(() => _applicationDAO.InsertNewApplication(A<Application>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public void InsertNewApplication_ShouldReturnFalse_WhenInsertFails()
        {
            // Arrange
            var application = new Application { Username = "user1", Password = "password" };
            A.CallTo(() => _applicationDAO.InsertNewApplication(A<Application>.Ignored)).Returns(0);

            // Act
            var result = _service.InsertNewApplication(application);

            // Assert
            result.Should().BeFalse();
        }

        #endregion

        #region GetAllApplications Tests

        [Fact]
        public void GetAllApplications_ShouldReturnApplications_WhenApplicationsExist()
        {
            // Arrange
            var applications = new List<Application> { new Application { Id = 1, Username = "user1" } };
            A.CallTo(() => _applicationDAO.GetAllApplications()).Returns(applications);

            // Act
            var result = _service.GetAllApplications();

            // Assert
            result.Should().HaveCount(1);
            result.Should().Contain(applications);
        }

        [Fact]
        public void GetAllApplications_ShouldReturnEmptyList_WhenNoApplicationsExist()
        {
            // Arrange
            A.CallTo(() => _applicationDAO.GetAllApplications()).Returns(new List<Application>());

            // Act
            var result = _service.GetAllApplications();

            // Assert
            result.Should().BeEmpty();
        }

        #endregion

        #region AcceptApplication Tests

        [Fact]
        public void AcceptApplication_ShouldInsertUser_WhenUserDoesNotExist()
        {
            // Arrange
            var application = new Application { Id = 1, Username = "newUser", League = 1 };
            A.CallTo(() => _applicationDAO.GetUsernameByApplicationId(1)).Returns("newUser");
            A.CallTo(() => _userDAO.GetUserByUsername("newUser")).Returns(null);
            A.CallTo(() => _applicationDAO.GetApplicationById(1)).Returns(application);
            A.CallTo(() => _userDAO.InsertUser(application)).Returns(1);

            // Act
            var result = _service.AcceptApplication(1);

            // Assert
            result.Should().Be(1);
            A.CallTo(() => _userDAO.InsertUser(application)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public void AcceptApplication_ShouldUpdateLeague_WhenUserExists()
        {
            // Arrange
            var user = new User { Id = 1, Username = "oldUser" };
            var application = new Application { Id = 1, League = 2 };

            A.CallTo(() => _applicationDAO.GetUsernameByApplicationId(1)).Returns("oldUser");
            A.CallTo(() => _userDAO.GetUserByUsername("oldUser")).Returns(user);
            A.CallTo(() => _applicationDAO.GetApplicationById(1)).Returns(application);
            A.CallTo(() => _userDAO.UpdateLeague(user.Id, application.League)).Returns(1);

            // Act
            var result = _service.AcceptApplication(1);

            // Assert
            result.Should().Be(1);
            A.CallTo(() => _userDAO.UpdateLeague(user.Id, application.League)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public void AcceptApplication_ShouldDeleteApplication_WhenAcceptIsSuccessful()
        {
            // Arrange
            var application = new Application { Id = 1, Username = "testUser" };
            A.CallTo(() => _applicationDAO.GetUsernameByApplicationId(1)).Returns("testUser");
            A.CallTo(() => _userDAO.GetUserByUsername("testUser")).Returns(null);
            A.CallTo(() => _applicationDAO.GetApplicationById(1)).Returns(application);
            A.CallTo(() => _userDAO.InsertUser(application)).Returns(1);

            // Act
            _service.AcceptApplication(1);

            // Assert
            A.CallTo(() => _applicationDAO.DeleteApplication(1)).MustHaveHappenedOnceExactly();
        }

        #endregion

        #region DeleteApplication Tests

        [Fact]
        public void DeleteApplication_ShouldReturnSuccess_WhenApplicationIsDeleted()
        {
            // Arrange
            A.CallTo(() => _applicationDAO.DeleteApplication(1)).Returns(1);

            // Act
            var result = _service.DeleteApplication(1);

            // Assert
            result.Should().Be(1);
        }

        [Fact]
        public void DeleteApplication_ShouldReturnZero_WhenApplicationIsNotDeleted()
        {
            // Arrange
            A.CallTo(() => _applicationDAO.DeleteApplication(1)).Returns(0);

            // Act
            var result = _service.DeleteApplication(1);

            // Assert
            result.Should().Be(0);
        }

        #endregion
    }
}
