using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.Service
{
    public class ApplicationService
    {
        private static readonly IUserDAO userDAO = new UserDAO();
        private static readonly IApplicationDAO applicationDAO = new ApplicationDAO();

        public bool InsertNewApplication(Application application) 
        {
            if (userDAO.GetUserByUsername(application.Username) == null)
            {
                applicationDAO.InsertNewApplication(application);
                return true;
            }
            else {
                return false;
            }
        }

        public List<Application> GetAllApplications() 
        {
            List<Application> applications = applicationDAO.GetAllApplications().ToList();
            return applications;
        }

        public int AcceptApplication(int id) {
            int accept = userDAO.InsertUser(applicationDAO.GetApplicationById(id));
            if (accept >= 1) {
                applicationDAO.DeleteApplication(id);
            }
            return accept;
        }
        public int DeleteApplication(int id) {
            return applicationDAO.DeleteApplication(id);
        }
    }
}
