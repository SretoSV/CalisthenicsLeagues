using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DTO;
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
                messageRequests.Add(new MessageRequest(m.Id, m.League, m.Content, m.Datetime, user.Username, user.Image, m.IsFile, m.HasReply));
            }
            return messageRequests;
        }

        public Message InsertNewMessage(Message createdMessage)
        {
            int messageId = chatDAO.InsertNewMessage(createdMessage);
            Message message = null;

            if (messageId >= 1)
            {
                message = chatDAO.GetMessageById(messageId);
            }
            return message;
        }

        public int DeleteMessage(int id)
        {
            return chatDAO.DeleteMessage(id);
        }

        public int EditMessage(EditMessageDTO editMessageDTO)
        {
            return chatDAO.EditMessage(editMessageDTO);
        }
    }
}
