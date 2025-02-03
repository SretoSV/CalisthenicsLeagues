using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.Service
{
    public class ShopService
    {
        private static readonly IShopDAO shopDAO = new ShopDAO();

        public List<Shirt> GetAllShirts()
        {
            return shopDAO.GetAllShirts().ToList();
        }

        public int processOrder(OrderDTO orderDTO)
        {
            int orderId = shopDAO.InsertNewOrder(orderDTO.UserId, orderDTO.ShippingDetails, orderDTO.TotalPrice);
            foreach (OrderItem item in orderDTO.Items)
            {
                shopDAO.InsertOrderItems(item, orderId);
            }
            return orderId;
        }
    }
}
