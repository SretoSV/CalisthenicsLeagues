namespace CalisthenicsLeagues.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int League { get; set; }
        public string Content { get; set; }
        public DateTime Datetime { get; set; }
        public int User { get; set; }
        public bool IsFile { get; set; }
        public int HasReply { get; set; }
        public Message() { 
        
        }

        public Message(int id, int league, string content, DateTime datetime, int user, bool isFile, int hasReply)
        {
            Id = id;
            League = league;
            Content = content;
            Datetime = datetime;
            User = user;
            IsFile = isFile;
            HasReply = hasReply;
        }
    }
}
