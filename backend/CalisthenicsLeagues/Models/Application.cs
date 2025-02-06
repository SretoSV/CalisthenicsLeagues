namespace CalisthenicsLeagues.Models
{
    public class Application
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string YoutubeLink { get; set; }
        public string Instagram { get; set; }
        public int League { get; set; }

        public Application(int id, string username, string name, string surname, string password, string email, string country, DateTime dateOfBirth, string youtubeLink, string instagram, int league)
        {
            Id = id;
            Username = username;
            Name = name;
            Surname = surname;
            Password = password;
            Email = email;
            Country = country;
            DateOfBirth = dateOfBirth;
            YoutubeLink = youtubeLink;
            Instagram = instagram;
            League = league;
        }
    }
}
