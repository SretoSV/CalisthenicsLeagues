using CalisthenicsLeagues.Connection;
using System.Data;
using CalisthenicsLeagues.Models;
using MySql.Data.MySqlClient;

namespace CalisthenicsLeagues.DAO.Impl
{
    public class ShirtDAO : IShirtDAO
    {
        public int Count()
        {
            throw new NotImplementedException();
        }

        public int Delete(Shirt entity)
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

        public IEnumerable<Shirt> FindAll()
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

        public IEnumerable<Shirt> FindAllById(IEnumerable<int> ids)
        {
            throw new NotImplementedException();
        }

        public Shirt FindById(int id)
        {
            throw new NotImplementedException();
        }

        public int Save(Shirt entity)
        {
            throw new NotImplementedException();
        }

        public int SaveAll(IEnumerable<Shirt> entities)
        {
            throw new NotImplementedException();
        }
    }
}
