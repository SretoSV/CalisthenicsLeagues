namespace CalisthenicsLeagues.Models.RequestsModels
{
    public class EditProfileRequest
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Country { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Instagram { get; set; }
        public string League { get; set; }
        public IFormFile? ProfileImage { get; set; }
        public EditProfileRequest() { }

        public EditProfileRequest(string id, string username, string name, string surname, string country, string dateOfBirth, string email, string instagram, string league,IFormFile? profileImage)
        {
            Id = id;
            Username = username;
            Name = name;
            Surname = surname;
            Country = country;
            DateOfBirth = dateOfBirth;
            Email = email;
            Instagram = instagram;
            League = league;
            ProfileImage = profileImage;
        }
    }
}
