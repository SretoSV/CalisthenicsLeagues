using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.DAO
{
    public interface IUserDAO : ICRUDDao<User, int>
    {
        User GetUserByEmailAndPassword(LoginRequest data);
        bool ExistsByEmailAndPassword(PasswordResetRequest data);
        int UpdatePassword(PasswordResetRequest data);
        int UpdateProfile(User user);
    }
}
