using System.Data;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        public IEnumerable<Application> GetAllApplications()
        {
            string query = "select * from applications";
            List<Application> applicationList = new List<Application>();

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
                            Application application = new Application(reader.GetInt32(0), reader.GetString(1), 
                                reader.GetString(2), reader.GetString(3), "", 
                                reader.GetString(5), reader.GetString(6), reader.GetDateTime(7), 
                                reader.GetString(8), reader.GetString(9), reader.GetInt32(10));

                            applicationList.Add(application);
                        }
                    }
                }
            }

            return applicationList;
        }
        public Application GetApplicationById(int id)
        {
            string query = "select * from applications where id = ?";
            Application application = null;

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = id });

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            application = new Application(reader.GetInt32(0), reader.GetString(1),
                                reader.GetString(2), reader.GetString(3), reader.GetString(4),
                                reader.GetString(5), reader.GetString(6), reader.GetDateTime(7),
                                reader.GetString(8), reader.GetString(9), reader.GetInt32(10));
                        }
                    }
                }
            }

            return application;
        }

        public int DeleteApplication(int id)
        {
            string deleteSql = "delete from applications where id = ?";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();

                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = deleteSql;
                    command.Parameters.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });

                    return command.ExecuteNonQuery();
                }
            }
        }

        public string GetUsernameByApplicationId(int id)
        {
            string query = "select username from applications where id = ?";
            string username = "";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = id });

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            username = reader.GetString(0);
                        }
                    }
                }
            }

            return username;
        }
    }
}
