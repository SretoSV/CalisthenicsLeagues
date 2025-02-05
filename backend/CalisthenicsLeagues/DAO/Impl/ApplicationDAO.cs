using System.Data;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;

namespace CalisthenicsLeagues.DAO.Impl
{
    public class ApplicationDAO : IApplicationDAO
    {
        public int InsertNewApplication(Application application)
        {
            string insertSql = @"
                INSERT INTO applications (username, name, surname, password, email, country, dateofbirth, youtubelink, instagram, league) 
                VALUES (@Username, @Name, @Surname, @Password, @Email, @Country, @Dateofbirth, @Youtubelink, @Instagram, @League);";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();

                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = insertSql;

                    command.Parameters.Add(new MySqlParameter("@Username", MySqlDbType.VarChar) { Value = application.Username });
                    command.Parameters.Add(new MySqlParameter("@Name", MySqlDbType.VarChar) { Value = application.Name });
                    command.Parameters.Add(new MySqlParameter("@Surname", MySqlDbType.VarChar) { Value = application.Surname });
                    command.Parameters.Add(new MySqlParameter("@Password", MySqlDbType.VarChar) { Value = application.Password });
                    command.Parameters.Add(new MySqlParameter("@Email", MySqlDbType.VarChar) { Value = application.Email });
                    command.Parameters.Add(new MySqlParameter("@Country", MySqlDbType.VarChar) { Value = application.Country });
                    command.Parameters.Add(new MySqlParameter("@Dateofbirth", MySqlDbType.Date) { Value = application.DateOfBirth });
                    command.Parameters.Add(new MySqlParameter("@Youtubelink", MySqlDbType.VarChar) { Value = application.YoutubeLink });
                    command.Parameters.Add(new MySqlParameter("@Instagram", MySqlDbType.VarChar) { Value = application.Instagram });
                    command.Parameters.Add(new MySqlParameter("@League", MySqlDbType.Int32) { Value = application.League });

                    return command.ExecuteNonQuery();
                }
            }
        }
    }
}
