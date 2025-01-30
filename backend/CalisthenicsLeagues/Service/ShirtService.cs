using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.Service
{
    public class ShirtService
    {
        private static readonly IShirtDAO shirtDAO = new ShirtDAO();

        public List<Shirt> FindAll()
        {

            return shirtDAO.FindAll().ToList();
        }
    }
}
