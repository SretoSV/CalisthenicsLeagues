using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using FakeItEasy;
using FluentAssertions;
using Xunit;

namespace CalisthenicsLeagues.Tests
{
    public class ChatServiceTests
    {
        private readonly ChatService _service;
        private readonly IChatDAO _chatDAO;
        private readonly IUserDAO _userDAO;

        public ChatServiceTests()
        {
            _chatDAO = A.Fake<IChatDAO>();
            _userDAO = A.Fake<IUserDAO>();
            _service = new ChatService(_chatDAO, _userDAO);
        }

        #region GetAllMessagesByLeague Tests

        [Fact]
        public void GetAllMessagesByLeague_ShouldReturnMessages_WhenMessagesExist()
        {
            // Arrange
            var messages = new List<Message>
            {
                new Message { Id = 1, User = 10, Content = "Test", IsDeleted = false, League = 1 },
                new Message { Id = 2, User = 11, Content = "Test", IsDeleted = true, League = 1 }
            };

            var user1 = new User { Id = 10, Username = "User1", Image = "img1.png" };
            var user2 = new User { Id = 11, Username = "User2", Image = "img2.png" };

            A.CallTo(() => _chatDAO.GetAllMessagesByLeague(1)).Returns(messages);
            A.CallTo(() => _userDAO.GetUserById(10)).Returns(user1);
            A.CallTo(() => _userDAO.GetUserById(11)).Returns(user2);

            // Act
            var result = _service.GetAllMessagesByLeague(1);

            // Assert
            result.Should().HaveCount(2);
            result[0].Content.Should().Be("Test");
            result[1].Content.Should().Be("Deleted message");
        }

        [Fact]
        public void GetAllMessagesByLeague_ShouldReturnEmptyList_WhenNoMessagesExist()
        {
            // Arrange
            A.CallTo(() => _chatDAO.GetAllMessagesByLeague(1)).Returns(new List<Message>());

            // Act
            var result = _service.GetAllMessagesByLeague(1);

            // Assert
            result.Should().BeEmpty();
        }

        #endregion

        #region InsertNewMessage Tests

        [Fact]
        public void InsertNewMessage_ShouldReturnMessage_WhenInsertIsSuccessful()
        {
            // Arrange
            var newMessage = new Message { Id = 0, Content = "Test", User = 5, HasReply = 0 };
            var savedMessage = new Message { Id = 1, Content = "Test", User = 5 };

            A.CallTo(() => _chatDAO.InsertNewMessage(A<Message>.Ignored)).Returns(1);
            //A.CallTo(() => _chatDAO.InsertNewMessage(A<Message>.That.Matches(m => m.Content == "Test"))).Returns(1);
            //Kad bi trebalo vratiti 1, samo kad je Content Test
            A.CallTo(() => _chatDAO.GetMessageById(1)).Returns(savedMessage);

            // Act
            var result = _service.InsertNewMessage(newMessage);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(1);
        }

        [Fact]
        public void InsertNewMessage_ShouldReturnNull_WhenInsertFails()
        {
            // Arrange
            var newMessage = new Message { Id = 0, Content = "Test", User = 5 };
            A.CallTo(() => _chatDAO.InsertNewMessage(A<Message>.Ignored)).Returns(0);

            // Act
            var result = _service.InsertNewMessage(newMessage);

            // Assert
            result.Should().BeNull();
        }

        [Fact]
        public void InsertNewMessage_ShouldSetReplyData_WhenHasReplyIsNotZero()
        {
            // Arrange
            var replyMessage = new Message { Id = 2, Content = "Reply", User = 6 };
            var newMessage = new Message { Id = 0, Content = "Test", User = 5, HasReply = 2 };
            var user = new User { Id = 6, Username = "replyUser" };

            A.CallTo(() => _chatDAO.GetMessageById(2)).Returns(replyMessage);
            A.CallTo(() => _userDAO.GetUserById(6)).Returns(user);
            A.CallTo(() => _chatDAO.InsertNewMessage(A<Message>.Ignored)).Returns(3);
            A.CallTo(() => _chatDAO.GetMessageById(3)).Returns(newMessage);

            // Act
            var result = _service.InsertNewMessage(newMessage);

            // Assert
            result.Should().NotBeNull();
            result.ReplyContent.Should().Be("Reply");
            result.ReplyUser.Should().Be("replyUser");
        }

        #endregion

        #region DeleteMessage Tests

        [Fact]
        public void DeleteMessage_ShouldReturnOne_WhenDeletionIsSuccessful()
        {
            // Arrange
            A.CallTo(() => _chatDAO.DeleteMessage(1)).Returns(1);

            // Act
            var result = _service.DeleteMessage(1);

            // Assert
            result.Should().Be(1);
        }

        [Fact]
        public void DeleteMessage_ShouldReturnZero_WhenDeletionFails()
        {
            // Arrange
            A.CallTo(() => _chatDAO.DeleteMessage(1)).Returns(0);

            // Act
            var result = _service.DeleteMessage(1);

            // Assert
            result.Should().Be(0);
        }

        #endregion

        #region EditMessage Tests

        [Fact]
        public void EditMessage_ShouldReturnOne_WhenEditIsSuccessful()
        {
            // Arrange
            var editDto = new EditMessageDTO { Id = 1, Content = "Edited Content" };
            A.CallTo(() => _chatDAO.EditMessage(editDto)).Returns(1);

            // Act
            var result = _service.EditMessage(editDto);

            // Assert
            result.Should().Be(1);
        }

        [Fact]
        public void EditMessage_ShouldReturnZero_WhenEditFails()
        {
            // Arrange
            var editDto = new EditMessageDTO { Id = 1, Content = "Edited Content" };
            A.CallTo(() => _chatDAO.EditMessage(editDto)).Returns(0);

            // Act
            var result = _service.EditMessage(editDto);

            // Assert
            result.Should().Be(0);
        }

        #endregion
    }
}
