namespace CalisthenicsLeagues.Models.RequestsModels
{
    public class MessageRequest
    {
        public int Id { get; set; }
        public int League { get; set; }
        public string Content { get; set; }
        public DateTime Datetime { get; set; }
        public string User { get; set; }
        public string UserProfilePicture { get; set; }
        public bool IsFile { get; set; }
        public bool IsDeleted { get; set; }
        public string? ReplyContent { get; set; }
        public string? ReplyUser { get; set; }
        public int HasReply { get; set; }

        public MessageRequest() { }
        public MessageRequest(int id, int league, string content, DateTime datetime, string user, string userProfilePicture, bool isFile, bool isDeleted, string? replyContent, string? replyUser, int hasReply)
        {
            Id = id;
            League = league;
            Content = content;
            Datetime = datetime;
            User = user;
            UserProfilePicture = userProfilePicture;
            IsFile = isFile;
            IsDeleted = isDeleted;
            ReplyContent = replyContent;
            ReplyUser = replyUser;
            HasReply = hasReply;
        }
    }
}
