using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.Service
{
    public class ChatService
    {
        private static readonly IChatDAO chatDAO = new ChatDAO();
        private static readonly IUserDAO userDAO = new UserDAO();
        public List<MessageRequest> GetAllMessagesByLeague(int leagueId)
        {
            List<MessageRequest> messageRequests = new List<MessageRequest>();
            List<Message> messages = chatDAO.GetAllMessagesByLeague(leagueId).ToList();
            foreach (Message m in messages) {
                User user = userDAO.GetUserById(m.User);
                messageRequests.Add(new MessageRequest(m.Id, m.League, m.Content, m.Datetime, user.Username, user.Image, m.IsFile));
            }
            return messageRequests;
        }
    }
}
