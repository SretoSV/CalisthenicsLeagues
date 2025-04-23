namespace CalisthenicsLeagues.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int User_id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Number { get; set; }
        public double Total_price { get; set; }
        public Order()
        {

        }

        public Order(int id, int user_id, string country, string city, string address, string number, double total_price)
        {
            Id = id;
            User_id = user_id;
            Country = country;
            City = city;
            Address = address;
            Number = number;
            Total_price = total_price;
        }
    }
}
