namespace CalisthenicsLeagues.Models
{
    public class ShippingDetails
    {
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Number { get; set; }

        public ShippingDetails() { }

        public ShippingDetails(string country, string city, string address, string number)
        {
            Country = country;
            City = city;
            Address = address;
            Number = number;
        }
    }
}
