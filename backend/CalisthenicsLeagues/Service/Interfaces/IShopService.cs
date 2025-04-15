using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;

namespace CalisthenicsLeagues.Service.Interfaces
{
    public interface IShopService
    {
        List<Shirt> GetAllShirts();
        int processOrder(OrderDTO orderDTO);
    }
}
