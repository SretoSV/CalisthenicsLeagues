using System.Data;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;

namespace CalisthenicsLeagues.DAO.Impl
{
    public class LeagueDAO : ILeagueDAO
    {
        public int Count()
        {
            throw new NotImplementedException();
        }

        public int Delete(League entity)
        {
            throw new NotImplementedException();
        }

        public int DeleteAll()
        {
            throw new NotImplementedException();
        }

        public int DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public bool ExistsById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<League> FindAll()
        {
            string query = "select id, name, image from leagues";
            List<League> leagueList = new List<League>();

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Prepare();

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            League league = new League(reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
                            leagueList.Add(league);
                        }
                    }
                }
            }

            return leagueList;
        }

        public IEnumerable<League> FindAllById(IEnumerable<int> ids)
        {
            throw new NotImplementedException();
        }

        public League FindById(int id)
        {
            throw new NotImplementedException();
        }

        public int Save(League entity)
        {
            throw new NotImplementedException();
        }

        public int SaveAll(IEnumerable<League> entities)
        {
            throw new NotImplementedException();
        }
    }
}
