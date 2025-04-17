using CalisthenicsLeagues.Connection;
using System.Data;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;
using CalisthenicsLeagues.Models.RequestsModels;
using CalisthenicsLeagues.DTO;
using Google.Protobuf;

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
                            Message message = new Message(reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2), reader.GetDateTime(3),
                                reader.GetInt32(4), reader.GetBoolean(5), reader.GetBoolean(6), reader.IsDBNull(7) ? null : reader.GetString(7), reader.IsDBNull(8) ? null : reader.GetString(8), reader.GetInt32(9));

                            messageList.Add(message);
                        }
                    }
                }
            }

            return messageList;
        }

        public IEnumerable<Message> GetLastXMessagesByLeague(int leagueId, int limit, DateTime? before)
        {
            Console.WriteLine(before);
            string query = "select * from (SELECT * FROM messages WHERE league = ? order by id DESC) as reverse where datetime < ? limit " + limit;
            //string query = "select * from (SELECT * FROM messages WHERE league = ? order by id DESC) as reverse where id < ? limit " + limit;
            List<Message> messageList = new List<Message>();

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = query;
                    command.Parameters.Add(new MySqlParameter("league", MySqlDbType.Int32) { Value = leagueId });
                    command.Parameters.Add(new MySqlParameter("datetime", MySqlDbType.DateTime) { Value = before });
                    //command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = before });
                    command.Prepare();

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Message message = new Message(reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2), reader.GetDateTime(3),
                                reader.GetInt32(4), reader.GetBoolean(5), reader.GetBoolean(6), reader.IsDBNull(7) ? null : reader.GetString(7), reader.IsDBNull(8) ? null : reader.GetString(8), reader.GetInt32(9));

                            messageList.Add(message);
                        }
                    }
                }
            }

            return messageList;
        }

        public Message GetMessageById(int id)
        {
            string query = "select * from messages where id = ?";
            Message message = null;

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
                            message = new Message(reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2), reader.GetDateTime(3),
                                reader.GetInt32(4), reader.GetBoolean(5), reader.GetBoolean(6), reader.IsDBNull(7) ? null : reader.GetString(7), reader.IsDBNull(8) ? null : reader.GetString(8), reader.GetInt32(9));
                        }
                    }
                }
            }

            return message;
        }

        public int InsertNewMessage(Message createdMessage)
        {
            string insertSql = @"
                INSERT INTO messages (league, content, datetime, user, isFile, isDeleted, replyContent, replyUser, hasReply) 
                VALUES (@League, @Content, @Datetime, @User, @IsFile, @IsDeleted, @ReplyContent, @ReplyUser, @HasReply);
                SELECT LAST_INSERT_ID();";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();

                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = insertSql;

                    command.Parameters.Add(new MySqlParameter("@League", MySqlDbType.Int32) { Value = createdMessage.League });
                    command.Parameters.Add(new MySqlParameter("@Content", MySqlDbType.Text) { Value = createdMessage.Content });
                    command.Parameters.Add(new MySqlParameter("@Datetime", MySqlDbType.DateTime) { Value = createdMessage.Datetime });
                    command.Parameters.Add(new MySqlParameter("@User", MySqlDbType.Int32) { Value = createdMessage.User });
                    command.Parameters.Add(new MySqlParameter("@IsFile", MySqlDbType.Bit) { Value = createdMessage.IsFile });
                    command.Parameters.Add(new MySqlParameter("@IsDeleted", MySqlDbType.Bit) { Value = createdMessage.IsDeleted });
                    command.Parameters.Add(new MySqlParameter("@ReplyContent", MySqlDbType.Text) { Value = createdMessage.ReplyContent });
                    command.Parameters.Add(new MySqlParameter("@ReplyUser", MySqlDbType.String) { Value = createdMessage.ReplyUser });
                    command.Parameters.Add(new MySqlParameter("@HasReply", MySqlDbType.Int32) { Value = createdMessage.HasReply });

                    var newMessageId = Convert.ToInt32(command.ExecuteScalar());
                    return newMessageId;
                }
            }
        }

        public int DeleteMessage(int id)
        {
            string deleteSql = "update messages set isDeleted = true where id = ?";

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

        public int EditMessage(EditMessageDTO editMessageDTO)
        {
            string updateSql = "update messages set content = ? where id = ?";
            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = updateSql;

                    command.Parameters.Add(new MySqlParameter("content", MySqlDbType.Text) { Value = editMessageDTO.Content });
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = editMessageDTO.Id });

                    return command.ExecuteNonQuery();
                }
            }

        }

        /*public int UpdateReplyMessage(int id, string content, bool isId)
        {
            string updateSql = isId ?
            updateSql = "update messages set replyContent = ? where id = ?"
            :
            updateSql = "update messages set replyContent = ? where hasReply = ?";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = updateSql;

                    command.Parameters.Add(new MySqlParameter("replyContent", MySqlDbType.Text) { Value = content });
                    command.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32) { Value = id });
                    command.Parameters.Add(new MySqlParameter("hasReply", MySqlDbType.Int32) { Value = id });

                    return command.ExecuteNonQuery();
                }
            }
        }*/

    }
}
