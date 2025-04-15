using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CalisthenicsLeagues.Hubs
{
    public class WebSocketHub : Hub
    {
        private static readonly ChatService chatService = new ChatService();
        private static readonly UserService userService = new UserService();

        [Authorize]
        public async Task SendMessage(string eventName, CreateMessageRequest createMessageRequest)
        {
            if (DateTime.TryParse(createMessageRequest.Datetime, out DateTime parsedDatetime))
            {
                Message message = new Message();

                message.League = createMessageRequest.League;
                message.Content = createMessageRequest.Content;
                message.Datetime = parsedDatetime;
                message.User = createMessageRequest.User;
                message.IsFile = createMessageRequest.IsFile;
                message.IsDeleted = createMessageRequest.IsDeleted;
                message.HasReply = createMessageRequest.HasReply;

                Message result = chatService.InsertNewMessage(message);
                User user = userService.GetUserById(result.User);
 
                MessageRequest messageRequest = new MessageRequest();
                messageRequest.Id = result.Id;
                messageRequest.League = result.League;
                messageRequest.Content = result.Content;
                messageRequest.Datetime = result.Datetime;
                messageRequest.User = user.Username;
                messageRequest.UserProfilePicture = user.Image;
                messageRequest.IsFile = result.IsFile;
                messageRequest.IsDeleted = result.IsDeleted;
                messageRequest.ReplyContent = result.ReplyContent;
                messageRequest.ReplyUser = result.ReplyUser;
                if (result.HasReply == 0) { 
                    messageRequest.HasReply = -1;
                }
                else {
                    messageRequest.HasReply = 0;
                }

                await Clients.All.SendAsync(eventName, messageRequest); //saljem poslednje insertovanu poruku
            }
            else
            {
                await Clients.All.SendAsync(eventName, "Message send error");
            }
        }

        [Authorize]
        public async Task EditMessage(string eventName, EditMessageDTO editMessageDTO)
        {
            if (chatService.EditMessage(editMessageDTO) < 1)
            {
                await Clients.All.SendAsync(eventName, "Error, message not edited!");
            }

            await Clients.All.SendAsync(eventName, editMessageDTO);
        }

        [Authorize]
        public async Task DeleteMessage(string eventName, EditMessageDTO editMessageDTO)
        {
            if (chatService.DeleteMessage(editMessageDTO.Id) < 1)
            {
                await Clients.All.SendAsync(eventName, "Error, message not deleted!");
            }
            await Clients.All.SendAsync(eventName, editMessageDTO.Id);
        }
    }
}
