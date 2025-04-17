using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.DAO
{
    public interface IChatDAO
    {
        IEnumerable<Message> GetAllMessagesByLeague(int leagueId);
        IEnumerable<Message> GetLastXMessagesByLeague(int leagueId, int limit, DateTime? before);
        int InsertNewMessage(Message createdMessage);
        Message GetMessageById(int id);
        int DeleteMessage(int id);
        int EditMessage(EditMessageDTO editMessageDTO);
        //int UpdateReplyMessage(int id, string content, bool isId);
    }
}
