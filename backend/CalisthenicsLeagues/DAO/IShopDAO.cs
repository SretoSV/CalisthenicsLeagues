using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.DAO
{
    public interface IShopDAO
    {
        IEnumerable<Shirt> GetAllShirts();
        int InsertNewOrder(int userId, ShippingDetails shippingDetails, double totalPrice);
        int InsertOrderItems(OrderItem orderItem, int orderId);
    }
}
