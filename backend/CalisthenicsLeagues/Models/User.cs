namespace CalisthenicsLeagues.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Country { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string Instagram { get; set; }
        public int League { get; set; }

        public User() { }

        public User(int id, string username, string name, string surname, string country, DateTime dateOfBirth, string email, string password, string image, string instagram, int league)
        {
            Id = id;
            Username = username;
            Name = name;
            Surname = surname;
            Country = country;
            DateOfBirth = dateOfBirth;
            Email = email;
            Password = password;
            Image = image;
            Instagram = instagram;
            League = league;
        }
    }
}
