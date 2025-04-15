using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.Service.Interfaces
{
    public interface IApplicationService
    {
        bool InsertNewApplication(Application application);
        List<Application> GetAllApplications();
        int AcceptApplication(int id);
        int DeleteApplication(int id);
    }
}
