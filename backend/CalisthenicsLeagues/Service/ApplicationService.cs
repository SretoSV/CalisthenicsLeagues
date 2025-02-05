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
    }
}
