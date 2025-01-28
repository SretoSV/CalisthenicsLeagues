using System.Data;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using MySql.Data.MySqlClient;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CalisthenicsLeagues.DAO.Impl
{
    public class UserDAO : IUserDAO
    {
        public int Count()
        {
            throw new NotImplementedException();
        }

        public int Delete(User entity)
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

        public bool ExistsByIdAndPassword(int id, string password)
        {
            string query = "select * from users where id = ? and password = ?";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;

                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = id });
                    command.Parameters.Add(new MySqlParameter("password", MySqlDbType.VarChar) { Value = password });
                    return command.ExecuteScalar() != null;
                }
            }
        }

        public IEnumerable<User> FindAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> FindAllById(IEnumerable<int> ids)
        {
            throw new NotImplementedException();
        }

        public User FindById(int id)
        {
            throw new NotImplementedException();
        }

        public User GetUserByEmailAndPassword(LoginRequest data)
        {
            string query = "select id, username, name, surname, country, dateofbirth, email, password, image, instagram " +
                   "from users where email = ? and password = ?";
            User user = null;

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                { 
                    command.CommandText = query;

                    command.Parameters.Add(new MySqlParameter("email", MySqlDbType.VarChar) { Value = data.Email });
                    command.Parameters.Add(new MySqlParameter("password", MySqlDbType.VarChar) { Value = data.Password });

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        { 
                            user = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3),
                                reader.GetString(4), reader.GetDateTime(5), reader.GetString(6), reader.GetString(7), reader.GetString(8), reader.GetString(9));
                        }
                    }
                }
            }

            return user;
        }

        public int Save(User entity)
        {
            throw new NotImplementedException();
        }

        public int SaveAll(IEnumerable<User> entities)
        {
            throw new NotImplementedException();
        }

        public int UpdatePassword(string newPassword, int id)
        {
            string updateSql = "update users set password = ? where id = ?";
            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = updateSql;

                    command.Parameters.Add(new MySqlParameter("password", MySqlDbType.VarChar) { Value = newPassword });
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = id });

                    return command.ExecuteNonQuery();
                }
            }

        }
    }
}
