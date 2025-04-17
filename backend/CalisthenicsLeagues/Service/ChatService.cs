using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.Service.Interfaces;

namespace CalisthenicsLeagues.Service
{
    public class ChatService : IChatService
    {
        private readonly IChatDAO chatDAO = new ChatDAO();
        private readonly IUserDAO userDAO = new UserDAO();

        public ChatService() { }
        public ChatService(IChatDAO chatDao, IUserDAO userDao) {
            chatDAO = chatDao;
            userDAO = userDao;
        }

        public List<MessageRequest> GetAllMessagesByLeague(int leagueId)
        {
            List<MessageRequest> messageRequests = new List<MessageRequest>();
            List<Message> messages = chatDAO.GetAllMessagesByLeague(leagueId).ToList();
            foreach (Message m in messages) {
                User user = userDAO.GetUserById(m.User);
                messageRequests.Add(new MessageRequest(m.Id, m.League, m.IsDeleted ? "Deleted message" : m.Content , m.Datetime, user.Username, user.Image, m.IsFile, m.IsDeleted, m.IsDeleted ? null : m.ReplyContent, m.ReplyUser, m.HasReply != 0 ? 0 : -1));
            }
            return messageRequests;
        }

        public List<MessageRequest> GetLastXMessagesByLeague(int leagueId, int limit, DateTime? before)
        {
            List<MessageRequest> messageRequests = new List<MessageRequest>();
            List<Message> messages = chatDAO.GetLastXMessagesByLeague(leagueId, limit, before).Reverse().ToList();
            foreach (Message m in messages)
            {
                User user = userDAO.GetUserById(m.User);
                messageRequests.Add(new MessageRequest(m.Id, m.League, m.IsDeleted ? "Deleted message" : m.Content, m.Datetime, user.Username, user.Image, m.IsFile, m.IsDeleted, m.IsDeleted ? null : m.ReplyContent, m.ReplyUser, m.HasReply != 0 ? 0 : -1));
            }
            return messageRequests;
        }

        public Message InsertNewMessage(Message createdMessage)
        {
            Message replyMessage = chatDAO.GetMessageById(createdMessage.HasReply);
            
            if (createdMessage.HasReply != 0) { 
                createdMessage.ReplyContent = replyMessage.Content;
                createdMessage.ReplyUser = userDAO.GetUserById(replyMessage.User).Username;
            }

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
            if (chatDAO.DeleteMessage(id) < 1)
            {
                return -1;
            }

            return id;
        }

        public int EditMessage(EditMessageDTO editMessageDTO)
        {
            //update messages set replyContnet = ? where hasReply = ?;
            /*if (chatDAO.EditMessage(editMessageDTO) >= 1) {
                chatDAO.UpdateReplyMessage(editMessageDTO.Id, editMessageDTO.Content, false);
                return 1;
            }*/
            if (chatDAO.EditMessage(editMessageDTO) < 1)
            {
                return -1;
            }
            
            return editMessageDTO.Id;

        }
    }
}
