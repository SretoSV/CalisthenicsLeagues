using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.Service
{
    public class UserService
    {
        private static readonly IUserDAO userDAO = new UserDAO();

        public User GetUserByEmailAndPassword(LoginRequest data)
        {
            return userDAO.GetUserByEmailAndPassword(data);
        }

        public bool UpdatePassword(PasswordResetRequest data)
        {
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
            user.League = data.League;
            return user;
        }
    }
}
