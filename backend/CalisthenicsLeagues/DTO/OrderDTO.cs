using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.DTO
{
    public class OrderDTO
    {
        public int UserId { get; set; }
        public List<OrderItem> Items { get; set; }
        public ShippingDetails ShippingDetails { get; set; }
        public double TotalPrice { get; set; }
    }
}
