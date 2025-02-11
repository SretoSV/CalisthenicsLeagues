namespace CalisthenicsLeagues.Models.RequestsModels
{
    public class CreateMessageRequest
    {
        public int League { get; set; }
        public string Content { get; set; }
        public string Datetime { get; set; }
        public int User { get; set; }
        public bool IsFile { get; set; }
        public int HasReply { get; set; }

        public CreateMessageRequest(int league, string content, string datetime, int user, bool isFile, int hasReply)
        {
            League = league;
            Content = content;
            Datetime = datetime;
            User = user;
            IsFile = isFile;
            HasReply = hasReply;
        }
    }
}
