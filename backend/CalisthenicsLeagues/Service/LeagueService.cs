using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.Service
{
    public class LeagueService
    {
        private static readonly ILeagueDAO leagueDAO = new LeagueDAO();

        public List<League> FindAll()
        {
            return leagueDAO.FindAll().ToList();
        }
    }
}
