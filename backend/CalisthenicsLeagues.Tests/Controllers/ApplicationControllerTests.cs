using Xunit;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using CalisthenicsLeagues.Controllers;
using CalisthenicsLeagues.Service;
using CalisthenicsLeagues.Models;
using System.Collections.Generic;
using CalisthenicsLeagues.Service.Interfaces;

public class ApplicationControllerTests
{
    private readonly ApplicationController _controller;
    private readonly IApplicationService _applicationService;

    public ApplicationControllerTests()
    {
        _applicationService = A.Fake<IApplicationService>();
        _controller = new ApplicationController(_applicationService);
    }

    #region Apply Tests
    [Fact]
    public void Apply_ShouldReturnBadRequest_WhenApplicationInsertionFails()
    {
        // Arrange
        var application = new Application ();
        A.CallTo(() => _applicationService.InsertNewApplication(application)).Returns(false);

        // Act
        var result = _controller.Apply(application) as BadRequestObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(400);
        result.Value.Should().BeEquivalentTo(new { message = "Error, application not sent!" });
    }

    [Fact]
    public void Apply_ShouldReturnOk_WhenApplicationInsertedSuccessfully()
    {
        // Arrange
        var application = new Application();
        A.CallTo(() => _applicationService.InsertNewApplication(application)).Returns(true);

        // Act
        var result = _controller.Apply(application) as ObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(200);
        result.Value.Should().BeEquivalentTo(new { message = "Application sent!" });
    }
    #endregion

    #region GetAllApplications Tests
    [Fact]
    public void GetAllApplications_ShouldReturnNoContent_WhenNoApplicationsExist()
    {
        // Arrange
        A.CallTo(() => _applicationService.GetAllApplications()).Returns(null);

        // Act
        var result = _controller.GetAllApplications() as StatusCodeResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(204);
    }

    [Fact]
    public void GetAllApplications_ShouldReturnOk_WithApplicationsList()
    {
        // Arrange
        var applications = new List<Application> { new Application(), new Application() };
        A.CallTo(() => _applicationService.GetAllApplications()).Returns(applications);

        // Act
        var result = _controller.GetAllApplications() as ObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(200);
        result.Value.Should().BeEquivalentTo(applications);
    }
    #endregion

    #region AcceptApplication Tests
    [Fact]
    public void AcceptApplication_ShouldReturnBadRequest_WhenApplicationNotAccepted()
    {
        // Arrange
        int appId = 1;
        A.CallTo(() => _applicationService.AcceptApplication(appId)).Returns(0);

        // Act
        var result = _controller.AcceptApplication(appId) as BadRequestObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(400);
        result.Value.Should().BeEquivalentTo(new { message = "Error, application not accepted!" });
    }

    [Fact]
    public void AcceptApplication_ShouldReturnOk_WhenApplicationAccepted()
    {
        // Arrange
        int appId = 1;
        A.CallTo(() => _applicationService.AcceptApplication(appId)).Returns(1);

        // Act
        var result = _controller.AcceptApplication(appId) as ObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(200);
        result.Value.Should().BeEquivalentTo(new { message = "Accepted" });
    }
    #endregion

    #region DeleteApplication Tests
    [Fact]
    public void DeleteApplication_ShouldReturnBadRequest_WhenApplicationNotDeleted()
    {
        // Arrange
        int appId = 1;
        A.CallTo(() => _applicationService.DeleteApplication(appId)).Returns(0);

        // Act
        var result = _controller.DeleteApplication(appId) as BadRequestObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(400);
        result.Value.Should().BeEquivalentTo(new { message = "Error, application not deleted!" });
    }

    [Fact]
    public void DeleteApplication_ShouldReturnOk_WhenApplicationDeleted()
    {
        // Arrange
        int appId = 1;
        A.CallTo(() => _applicationService.DeleteApplication(appId)).Returns(1);

        // Act
        var result = _controller.DeleteApplication(appId) as ObjectResult;

        // Assert
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(200);
        result.Value.Should().BeEquivalentTo(new { message = "Deleted" });
    }
    #endregion
}
