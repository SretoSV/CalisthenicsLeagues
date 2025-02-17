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
                messageRequests.Add(new MessageRequest(m.Id, m.League, m.IsDeleted ? "Deleted message" : m.Content , m.Datetime, user.Username, user.Image, m.IsFile, m.HasReply, m.IsDeleted, m.IsDeleted ? null : m.ReplyContent));
            }
            return messageRequests;
        }

        public Message InsertNewMessage(Message createdMessage)
        {
            int messageId = chatDAO.InsertNewMessage(createdMessage);
            Message message = null;

            if (messageId >= 1)
            {
                //get Message by HasReply id and update replyContent with content from HasReply ID message Content
                if (createdMessage.HasReply != 0) { 
                    chatDAO.UpdateReplyMessage(messageId, chatDAO.GetMessageById(createdMessage.HasReply).Content, true);
                }
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
            //update messages set replyContnet = ? where hasReply = ?;
            if (chatDAO.EditMessage(editMessageDTO) >= 1) {
                chatDAO.UpdateReplyMessage(editMessageDTO.Id, editMessageDTO.Content, false);
                return 1;
            }

            return 0;
        }
    }
}
