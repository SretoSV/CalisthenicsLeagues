using CalisthenicsLeagues.Connection;
using System.Data;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;

namespace CalisthenicsLeagues.DAO.Impl
{
    public class ShopDAO : IShopDAO
    {
        public IEnumerable<Shirt> GetAllShirts()
        {
            string query = "select * from shirts";
            List<Shirt> shirtList = new List<Shirt>();

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
                            Shirt shirt = new Shirt(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5), reader.GetDouble(6));
                            shirtList.Add(shirt);
                        }
                    }
                }
            }

            return shirtList;
        }

        public int InsertNewOrder(int userId, ShippingDetails shippingDetails, double totalPrice)
        {
            string insertSql = @"
                INSERT INTO orders (user_id, country, city, address, number, total_price) 
                VALUES (@UserId, @Country, @City, @Address, @Number, @TotalPrice);
                SELECT LAST_INSERT_ID();";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();

                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = insertSql;

                    command.Parameters.Add(new MySqlParameter("@UserId", MySqlDbType.Int32) { Value = userId });
                    command.Parameters.Add(new MySqlParameter("@Country", MySqlDbType.VarChar) { Value = shippingDetails.Country });
                    command.Parameters.Add(new MySqlParameter("@City", MySqlDbType.VarChar) { Value = shippingDetails.City });
                    command.Parameters.Add(new MySqlParameter("@Address", MySqlDbType.VarChar) { Value = shippingDetails.Address });
                    command.Parameters.Add(new MySqlParameter("@Number", MySqlDbType.VarChar) { Value = shippingDetails.Number });
                    command.Parameters.Add(new MySqlParameter("@TotalPrice", MySqlDbType.Decimal) { Value = totalPrice });

                    var newOrderId = Convert.ToInt32(command.ExecuteScalar());
                    return newOrderId;
                }
            }
        }

        public int InsertOrderItems(OrderItem orderItem, int orderId)
        {
            string insertSql = @"
                INSERT INTO order_items (league, shirtImage, size, quantity, price, order_id) 
                VALUES (@League, @ShirtImage, @Size, @Quantity, @Price, @Order_id);";

            using (IDbConnection connection = new MySqlConnection(ConnectionClass.GetConnectionString()))
            {
                connection.Open();

                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = insertSql;

                    command.Parameters.Add(new MySqlParameter("@League", MySqlDbType.String) { Value = orderItem.LeagueName });
                    command.Parameters.Add(new MySqlParameter("@ShirtImage", MySqlDbType.String) { Value = orderItem.ShirtImage });
                    command.Parameters.Add(new MySqlParameter("@Size", MySqlDbType.String) { Value = orderItem.Size });
                    command.Parameters.Add(new MySqlParameter("@Quantity", MySqlDbType.Int32) { Value = orderItem.Quantity });
                    command.Parameters.Add(new MySqlParameter("@Price", MySqlDbType.Decimal) { Value = orderItem.Price });
                    command.Parameters.Add(new MySqlParameter("@Order_id", MySqlDbType.Int32) { Value = orderId });

                    return command.ExecuteNonQuery();
                }
            }
        }
    }
}
