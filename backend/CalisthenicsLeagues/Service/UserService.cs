using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using Microsoft.AspNetCore.Identity;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CalisthenicsLeagues.Service
{
    public class UserService
    {
        private static readonly IUserDAO userDAO = new UserDAO();
        private readonly PasswordHasher<string> passwordHasher = new PasswordHasher<string>();

        public User GetUserByEmailAndPassword(LoginRequest data)
        {

            var result = passwordHasher.VerifyHashedPassword(null, userDAO.GetPasswordByEmail(data.Email), data.Password);

            if (result == PasswordVerificationResult.Success)
            {
                data.Password = userDAO.GetPasswordByEmail(data.Email);
                return userDAO.GetUserByEmailAndPassword(data);
            }
            else 
            {
                return null;
            }

        }
        public User GetUserByUsername(string username)
        {
            return userDAO.GetUserByUsername(username);
        }

        public bool UpdatePassword(PasswordResetRequest data)
        {
            data.OldPassword = userDAO.GetPasswordByEmail(data.Email);
            data.NewPassword = passwordHasher.HashPassword(null, data.NewPassword);

            if (!userDAO.ExistsByEmailAndPassword(data)) { 
                return false;
            }

            if (userDAO.UpdatePassword(data) < 1) { 
                return false;
            }
            
            return true;
        }

        public bool UpdateProfile(User user)
        {
            if (user.Image.Equals("NoPicture")) {
                user.Image = userDAO.GetPictureById(user.Id);
            }

            if (userDAO.UpdateProfile(user) < 1)
            {
                return false;
            }
            return true;
        }

        public List<User> GetLeagueMembers(int id) {
            List<User> members = userDAO.FindAllByLeagueId(id).ToList();
            return members;
        }

        public User FillUserFields(EditProfileRequest data, string relativeFilePath)
        {
            User user = new User();
            user.Id = Int32.Parse(data.Id);
            user.Username = data.Username;
            user.Name = data.Name;
            user.Surname = data.Surname;
            user.Country = data.Country;
            user.DateOfBirth = DateTime.Parse(data.DateOfBirth);
            user.Email = data.Email;
            user.Image = relativeFilePath;
            user.Instagram = data.Instagram;
            user.League = Int32.Parse(data.League);
            return user;
        }

        public async Task<User> GetUserDataForProfileEdit(EditProfileRequest data) {
            User user = new User();
            if (data.ProfileImage != null)
            {
                Console.WriteLine("Picture");

                var uploadPath = Path.Combine("wwwroot", "Images");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(data.ProfileImage.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await data.ProfileImage.CopyToAsync(fileStream);
                }

                var relativeFilePath = Path.Combine("Images", fileName);

                user = FillUserFields(data, relativeFilePath);
                Console.WriteLine(filePath + "\n" + relativeFilePath);

            }
            else
            {
                user = FillUserFields(data, "NoPicture");
                Console.WriteLine("No picture");
            }

            return user;
        }
    }
}
