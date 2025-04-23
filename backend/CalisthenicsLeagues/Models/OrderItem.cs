namespace CalisthenicsLeagues.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string League { get; set; }
        public string ShirtImage { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }

        public OrderItem() { }

        public OrderItem(int id, string league, string shirtImage, string size, int quantity, double price)
        {
            Id = id;
            League = league;
            ShirtImage = shirtImage;
            Size = size;
            Quantity = quantity;
            Price = price;
        }
    }
}
