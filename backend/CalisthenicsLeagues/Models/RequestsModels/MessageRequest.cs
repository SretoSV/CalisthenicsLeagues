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

        public MessageRequest(int id, int league, string content, DateTime datetime, string user, string userProfilePicture, bool isFile)
        {
            Id = id;
            League = league;
            Content = content;
            Datetime = datetime;
            User = user;
            UserProfilePicture = userProfilePicture;
            IsFile = isFile;
        }
    }
}
