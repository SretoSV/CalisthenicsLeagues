namespace CalisthenicsLeagues.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string LeagueName { get; set; }
        public string ShirtImage { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }

        public OrderItem() { }

        public OrderItem(int id, string leagueName, string shirtImage, string size, int quantity, double price)
        {
            Id = id;
            LeagueName = leagueName;
            ShirtImage = shirtImage;
            Size = size;
            Quantity = quantity;
            Price = price;
        }
    }
}
