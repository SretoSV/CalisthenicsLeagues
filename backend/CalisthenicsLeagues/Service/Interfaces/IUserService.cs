using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;

namespace CalisthenicsLeagues.Service.Interfaces
{
    public interface IUserService
    {
        User GetUserByEmailAndPassword(LoginRequest data);
        User GetUserByUsername(string username);
        bool UpdatePassword(PasswordResetRequest data);
        bool UpdateProfile(User user);
        List<User> GetLeagueMembers(int id);
        User FillUserFields(EditProfileRequest data, string relativeFilePath);
        Task<User> GetUserDataForProfileEdit(EditProfileRequest data);
    }
}
