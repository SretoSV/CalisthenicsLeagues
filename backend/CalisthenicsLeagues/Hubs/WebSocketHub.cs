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
                await Clients.All.SendAsync(eventName, "Message sent succesfully");
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

            await Clients.All.SendAsync(eventName, "Edited");
        }

        [Authorize]
        public async Task DeleteMessage(string eventName, EditMessageDTO editMessageDTO)
        {
            if (chatService.DeleteMessage(editMessageDTO.Id) < 1)
            {
                await Clients.All.SendAsync(eventName, "Error, message not deleted!");
            }
            await Clients.All.SendAsync(eventName, "Deleted");
        }
    }
}
