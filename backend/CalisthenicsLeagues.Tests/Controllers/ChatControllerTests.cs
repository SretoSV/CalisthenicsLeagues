using CalisthenicsLeagues.Controllers;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service.Interfaces;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace CalisthenicsLeagues.Tests.Controllers
{
    public class ChatControllerTests
    {
        private readonly ChatController _chatController;
        private readonly IChatService _chatService;

        public ChatControllerTests()
        {
            _chatService = A.Fake<IChatService>();
            _chatController = new ChatController(_chatService);
        }

        #region GetAllApplications Tests

        [Fact]
        public void GetAllApplications_ShouldReturn204_WhenNoMessagesExist()
        {
            // Arrange
            int leagueId = 1;
            A.CallTo(() => _chatService.GetAllMessagesByLeague(leagueId)).Returns(null);

            // Act
            var result = _chatController.GetAllApplications(leagueId) as StatusCodeResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(204);
        }

        [Fact]
        public void GetAllApplications_ShouldReturn200_WithMessages()
        {
            // Arrange
            int leagueId = 1;
            var messages = new List<MessageRequest> { new MessageRequest() };
            A.CallTo(() => _chatService.GetAllMessagesByLeague(leagueId)).Returns(messages);

            // Act
            var result = _chatController.GetAllApplications(leagueId) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().BeEquivalentTo(messages);
        }

        #endregion

        #region NewMessage Tests

        [Fact]
        public void NewMessage_ShouldReturn400_WhenInvalidDateTime()
        {
            // Arrange
            var request = new CreateMessageRequest { Datetime = "invalid-date" };

            // Act
            var result = _chatController.NewMessage(request) as BadRequestObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(400);
            result.Value.Should().Be("Invalid datetime format.");
        }

        [Fact]
        public void NewMessage_ShouldReturn200_WhenMessageIsSaved()
        {
            // Arrange
            var request = new CreateMessageRequest
            {
                League = 1,
                Content = "Test",
                Datetime = "2024-03-29T12:00:00",
                User = 1
            };

            var message = new Message { Id = 1, Content = "Test" };
            A.CallTo(() => _chatService.InsertNewMessage(A<Message>.Ignored)).Returns(message);

            // Act
            var result = _chatController.NewMessage(request) as OkObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().Be(message);
        }

        [Fact]
        public void NewMessage_ShouldReturn400_WhenMessageIsNotSaved()
        {
            // Arrange
            var request = new CreateMessageRequest
            {
                League = 1,
                Content = "Test",
                Datetime = "2024-03-29T12:00:00",
                User = 1
            };

            A.CallTo(() => _chatService.InsertNewMessage(A<Message>.Ignored)).Returns(null);

            // Act
            var result = _chatController.NewMessage(request) as BadRequestObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(400);
            result.Value.Should().Be("Error saving message");
        }

        #endregion

        #region DeleteMessage Tests

        [Fact]
        public void DeleteMessage_ShouldReturn400_WhenMessageIsNotDeleted()
        {
            // Arrange
            int messageId = 1;
            A.CallTo(() => _chatService.DeleteMessage(messageId)).Returns(0);

            // Act
            var result = _chatController.DeleteMessage(messageId) as BadRequestObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(400);
            result.Value.Should().BeEquivalentTo(new { message = "Error, message not deleted!" });
        }

        [Fact]
        public void DeleteMessage_ShouldReturn200_WhenMessageIsDeleted()
        {
            // Arrange
            int messageId = 1;
            A.CallTo(() => _chatService.DeleteMessage(messageId)).Returns(1);

            // Act
            var result = _chatController.DeleteMessage(messageId) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().BeEquivalentTo(new { message = "Deleted" });
        }

        #endregion

        #region EditMessage Tests

        [Fact]
        public void EditMessage_ShouldReturn400_WhenMessageIsNotEdited()
        {
            // Arrange
            var editMessageDTO = new EditMessageDTO();
            A.CallTo(() => _chatService.EditMessage(editMessageDTO)).Returns(0);

            // Act
            var result = _chatController.EditMessage(editMessageDTO) as BadRequestObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(400);
            result.Value.Should().BeEquivalentTo(new { message = "Error, message not edited!" });
        }

        [Fact]
        public void EditMessage_ShouldReturn200_WhenMessageIsEdited()
        {
            // Arrange
            var editMessageDTO = new EditMessageDTO();
            A.CallTo(() => _chatService.EditMessage(editMessageDTO)).Returns(1);

            // Act
            var result = _chatController.EditMessage(editMessageDTO) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().BeEquivalentTo(new { message = "Edited" });
        }

        #endregion
    }
}