using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.DAO
{
    public interface IUserDAO : ICRUDDao<User, int>
    {
        User GetUserByEmailAndPassword(LoginRequest data);
        User GetUserByUsername(string username);
        User GetUserById(int id);
        bool ExistsByEmailAndPassword(PasswordResetRequest data);
        int UpdatePassword(PasswordResetRequest data);
        int UpdateProfile(User user);
        string GetPictureById(int id);
        IEnumerable<User> FindAllByLeagueId(int id);
        int InsertUser(Application application);

        int UpdateLeague(int id, int league);
    }
}
