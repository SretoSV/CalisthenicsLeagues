using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.DAO
{
    public interface IApplicationDAO
    {
        int InsertNewApplication(Application application);
        IEnumerable<Application> GetAllApplications();
        Application GetApplicationById(int id);
        int DeleteApplication(int id);
        string GetUsernameByApplicationId(int id);
    }
}
