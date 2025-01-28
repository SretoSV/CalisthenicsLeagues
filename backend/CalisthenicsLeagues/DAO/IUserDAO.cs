using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.DAO
{
    public interface IUserDAO : ICRUDDao<User, int>
    {
        User GetUserByEmailAndPassword(LoginRequest data);
        bool ExistsByIdAndPassword(int id, string password);
        int UpdatePassword(string newPassword, int id);
    }
}
