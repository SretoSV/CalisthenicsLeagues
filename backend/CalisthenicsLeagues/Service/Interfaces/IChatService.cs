using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.Service.Interfaces
{
    public interface IChatService
    {
        List<MessageRequest> GetAllMessagesByLeague(int leagueId);
        Message InsertNewMessage(Message createdMessage);
        int DeleteMessage(int id);
        int EditMessage(EditMessageDTO editMessageDTO);
    }
}
