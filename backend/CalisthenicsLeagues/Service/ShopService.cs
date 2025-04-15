using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DAO.Impl;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service.Interfaces;

namespace CalisthenicsLeagues.Service
{
    public class ShopService : IShopService
    {
        private readonly IShopDAO shopDAO = new ShopDAO();
        public ShopService() { }
        public ShopService(IShopDAO shopDao) {
            shopDAO = shopDao;
        }
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
