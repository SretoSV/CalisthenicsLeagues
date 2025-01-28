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

        public bool UpdatePassword(PasswordResetRequest data, int id)
        {
            if (!userDAO.ExistsByIdAndPassword(id, data.OldPassword)) { 
                return false;
            }

            if (userDAO.UpdatePassword(data.NewPassword, id) < 1) { 
                return false;
            }
            
            return true;
        }
    }
}
