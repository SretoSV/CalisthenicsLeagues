using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service.Interfaces;

namespace CalisthenicsLeagues.Service
{
    public class LeagueService : ILeagueService
    {
        private readonly ILeagueDAO leagueDAO = new LeagueDAO();
        public LeagueService() { }
        public LeagueService(ILeagueDAO leagueDao) {
            leagueDAO = leagueDao;
        }

        public List<League> FindAll()
        {
            return leagueDAO.FindAll().ToList();
        }
    }
}
