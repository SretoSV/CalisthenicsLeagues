using CalisthenicsLeagues.Connection;
using System.Data;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CalisthenicsLeagues.DAO.Impl
{
    public class ChatDAO : IChatDAO
    {
        public IEnumerable<Message> GetAllMessagesByLeague(int leagueId)
        {
            string query = "select * from messages where league = ?";
            List<Message> messageList = new List<Message>();

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Parameters.Add(new MySqlParameter("league", MySqlDbType.Int32) { Value = leagueId });
                    command.Prepare();

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Message message = new Message(reader.GetInt32(0), reader.GetInt32(1),
                                reader.GetString(2), reader.GetDateTime(3), reader.GetInt32(4), reader.GetBoolean(5));

                            messageList.Add(message);
                        }
                    }
                }
            }

            return messageList;
        }
    }
}
