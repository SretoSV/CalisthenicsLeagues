using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.DAO
{
    public interface IChatDAO
    {
        IEnumerable<Message> GetAllMessagesByLeague(int leagueId);
    }
}
