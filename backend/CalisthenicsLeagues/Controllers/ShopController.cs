using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalisthenicsLeagues.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private static readonly ShopService shopService = new ShopService();

        [HttpGet("shirts")]
        public IActionResult GetShirts()
        {
            List<Shirt> leagues = shopService.GetAllShirts();
            return StatusCode(200, leagues);
        }

        [HttpPost("orders")]
        public IActionResult OrdersRequest([FromBody] OrderDTO orderDTO)
        {
            int orderID = shopService.processOrder(orderDTO);
            return StatusCode(200, orderID);
        }
    }
}
