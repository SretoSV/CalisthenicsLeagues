using System.Data;
using CalisthenicsLeagues.Connection;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Models.RequestsModels;
using MySql.Data.MySqlClient;
using Mysqlx.Crud;
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

        public bool ExistsByEmailAndPassword(PasswordResetRequest data)
        {
            string query = "select * from users where email = ? and password = ?";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;

                    command.Parameters.Add(new MySqlParameter("email", MySqlDbType.VarChar) { Value = data.Email });
                    command.Parameters.Add(new MySqlParameter("password", MySqlDbType.VarChar) { Value = data.OldPassword });
                    return command.ExecuteScalar() != null;
                }
            }
        }

        public User GetUserById(int id)
        {
            string query = "select id, username, name, surname, country, dateofbirth, email, password, image, instagram, league, accepted, admin " +
                            "from users where id = ?";
            User user = null;

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;

                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.VarChar) { Value = id });

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            user = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3),
                                reader.GetString(4), reader.GetDateTime(5), reader.GetString(6), reader.GetString(7),
                                reader.GetString(8), reader.GetString(9), reader.GetInt32(10), reader.GetBoolean(11), reader.GetBoolean(12));
                        }
                    }
                }
            }

            return user;
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
            string query = "select id, username, name, surname, country, dateofbirth, email, password, image, instagram, league, accepted, admin " +
                   "from users where email = ? and password = ? and accepted = 1";
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
                                reader.GetString(4), reader.GetDateTime(5), reader.GetString(6), reader.GetString(7), 
                                reader.GetString(8), reader.GetString(9), reader.GetInt32(10), reader.GetBoolean(11), reader.GetBoolean(12));
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

        public int UpdatePassword(PasswordResetRequest data)
        {
            string updateSql = "update users set password = ? where email = ?";
            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = updateSql;

                    command.Parameters.Add(new MySqlParameter("password", MySqlDbType.VarChar) { Value = data.NewPassword });
                    command.Parameters.Add(new MySqlParameter("email", MySqlDbType.VarChar) { Value = data.Email });

                    return command.ExecuteNonQuery();
                }
            }

        }

        public int UpdateProfile(User user)
        {
            string updateSql = "update users set username = ?, name = ?, surname = ?, " +
                "country = ?, dateofbirth = ?, email = ?, image = ?, instagram = ? where id = ?";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = updateSql;
                    
                    command.Parameters.Add(new MySqlParameter("username", MySqlDbType.VarChar) { Value = user.Username });
                    command.Parameters.Add(new MySqlParameter("name", MySqlDbType.VarChar) { Value = user.Name });
                    command.Parameters.Add(new MySqlParameter("surname", MySqlDbType.VarChar) { Value = user.Surname });
                    command.Parameters.Add(new MySqlParameter("country", MySqlDbType.VarChar) { Value = user.Country });
                    command.Parameters.Add(new MySqlParameter("dateofbirth", MySqlDbType.Date) { Value = user.DateOfBirth });
                    command.Parameters.Add(new MySqlParameter("email", MySqlDbType.VarChar) { Value = user.Email });
                    command.Parameters.Add(new MySqlParameter("image", MySqlDbType.VarChar) { Value = user.Image });
                    command.Parameters.Add(new MySqlParameter("instagram", MySqlDbType.VarChar) { Value = user.Instagram });
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = user.Id });

                    return command.ExecuteNonQuery();
                }
            }
        }

        public string GetPictureById(int id)
        {
            string query = "select image from users where id = ?";
            string imagePath = "";
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
                            imagePath = reader.GetString(0);
                        }
                    }
                }
            }

            return imagePath;
        }

        public User GetUserByUsername(string username)
        {
            string query = "select id, username, name, surname, country, dateofbirth, email, password, image, instagram, league, accepted, admin " +
                   "from users where username = ?";
            User user = null;

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Parameters.Add(new MySqlParameter("username", MySqlDbType.VarChar) { Value = username });
                    command.Prepare();

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            user = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3),
                                reader.GetString(4), reader.GetDateTime(5), reader.GetString(6), reader.GetString(7), 
                                reader.GetString(8), reader.GetString(9), reader.GetInt32(10), reader.GetBoolean(11), reader.GetBoolean(12));
                        }
                    }
                }
            }

            return user;
        }

        public IEnumerable<User> FindAllByLeagueId(int id)
        {
            string query = "select id, username, name, surname, country, dateofbirth, email, image, instagram, league, accepted, admin " +
                            "from users where league = ?";
            List<User> userList = new List<User>();

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Parameters.Add(new MySqlParameter("league", MySqlDbType.Int32) { Value = id });
                    command.Prepare();

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            User user = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3),
                                reader.GetString(4), reader.GetDateTime(5), reader.GetString(6), "", reader.GetString(7), 
                                reader.GetString(8), reader.GetInt32(9), reader.GetBoolean(10), reader.GetBoolean(11));

                            userList.Add(user);
                        }
                    }
                }
            }

            return userList;
        }

        public int InsertUser(Application application)
        {
            string insertSql = @"
                INSERT INTO users (username, name, surname, country, dateofbirth, email, password, image, instagram, league, accepted, admin) 
                VALUES (@Username, @Name, @Surname, @Country, @Dateofbirth, @Email, @Password, @Image, @Instagram, @League, @Accepted, @Admin);";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();

                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = insertSql;

                    command.Parameters.Add(new MySqlParameter("@Username", MySqlDbType.String) { Value = application.Username });
                    command.Parameters.Add(new MySqlParameter("@Name", MySqlDbType.String) { Value = application.Name });
                    command.Parameters.Add(new MySqlParameter("@Surname", MySqlDbType.String) { Value = application.Surname });
                    command.Parameters.Add(new MySqlParameter("@Country", MySqlDbType.String) { Value = application.Country });
                    command.Parameters.Add(new MySqlParameter("@Dateofbirth", MySqlDbType.Date) { Value = application.DateOfBirth });
                    command.Parameters.Add(new MySqlParameter("@Password", MySqlDbType.String) { Value = application.Password });
                    command.Parameters.Add(new MySqlParameter("@Email", MySqlDbType.String) { Value = application.Email });
                    command.Parameters.Add(new MySqlParameter("@Image", MySqlDbType.String) { Value = "Images\\placeHolder.png" });
                    command.Parameters.Add(new MySqlParameter("@Instagram", MySqlDbType.String) { Value = application.Instagram });
                    command.Parameters.Add(new MySqlParameter("@League", MySqlDbType.Int32) { Value = application.League });
                    command.Parameters.Add(new MySqlParameter("@Accepted", MySqlDbType.Bit) { Value = true });
                    command.Parameters.Add(new MySqlParameter("@Admin", MySqlDbType.Int32) { Value = false });

                    return command.ExecuteNonQuery();
                }
            }
        }

        public int UpdateLeague(int id, int league)
        {
            string updateSql = "update users set league = ? where id = ?";
            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = updateSql;

                    command.Parameters.Add(new MySqlParameter("league", MySqlDbType.VarChar) { Value = league });
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.VarChar) { Value = id });
                    
                    return command.ExecuteNonQuery();
                }
            }
        }
    }
}
