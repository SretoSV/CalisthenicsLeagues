using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.Service.Interfaces
{
    public interface IChatService
    {
        List<MessageRequest> GetAllMessagesByLeague(int leagueId);
        List<MessageRequest> GetLastXMessagesByLeague(int leagueId, int limit, DateTime? before);
        Message InsertNewMessage(Message createdMessage);
        int DeleteMessage(int id);
        int EditMessage(EditMessageDTO editMessageDTO);
    }
}
