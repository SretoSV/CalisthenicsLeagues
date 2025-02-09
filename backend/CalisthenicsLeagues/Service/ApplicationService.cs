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
            if (applicationDAO.InsertNewApplication(application) >= 1)
            {
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
            User user = userDAO.GetUserByUsername(applicationDAO.GetUsernameByApplicationId(id));
            Application application = applicationDAO.GetApplicationById(id);
            int accept;

            if (user == null)
            {
                //user first application
                accept = userDAO.InsertUser(application);
            }
            else {
                //user already exists
                accept = userDAO.UpdateLeague(user.Id, application.League);
            }

            if (accept >= 1)
            {
                applicationDAO.DeleteApplication(id);
            }
            return accept;
        }
        public int DeleteApplication(int id) {
            return applicationDAO.DeleteApplication(id);
        }
    }
}
