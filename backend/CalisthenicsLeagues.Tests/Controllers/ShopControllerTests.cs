using CalisthenicsLeagues.Controllers;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service.Interfaces;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace CalisthenicsLeagues.Tests.Controllers
{
    public class ShopControllerTests
    {
        private readonly IShopService _shopService;
        private readonly ShopController _shopController;

        public ShopControllerTests()
        {
            _shopService = A.Fake<IShopService>();
            _shopController = new ShopController(_shopService);
        }

        #region GetShirts Tests

        [Fact]
        public void GetShirts_ShouldReturnShirtsList()
        {
            // Arrange
            var shirts = new List<Shirt>
            {
                new Shirt { Id = 1, LeagueName = "Legendary", Price = 20.00 },
                new Shirt { Id = 2, LeagueName = "World-Class", Price = 25.00 }
            };

            A.CallTo(() => _shopService.GetAllShirts()).Returns(shirts);

            // Act
            var result = _shopController.GetShirts() as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().BeEquivalentTo(shirts);
        }

        [Fact]
        public void GetShirts_ShouldReturnEmptyList_WhenNoShirtsAvailable()
        {
            // Arrange
            var shirts = new List<Shirt>();
            A.CallTo(() => _shopService.GetAllShirts()).Returns(shirts);

            // Act
            var result = _shopController.GetShirts() as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().BeEquivalentTo(shirts);
        }

        #endregion

        #region OrdersRequest Tests

        [Fact]
        public void OrdersRequest_ShouldReturnOrderId_WhenOrderIsProcessed()
        {
            // Arrange
            var orderDTO = new OrderDTO
            {
                UserId = 1,
                ShippingDetails = new ShippingDetails
                {
                    Country = "Serbia",
                    City = "Belgrade",
                    Address = "Bulevar 12",
                    Number = "0611111111"
                },
                TotalPrice = 50.00,
                Items = new List<OrderItem> { new OrderItem { Id = 1, Quantity = 2 } }
            };

            A.CallTo(() => _shopService.processOrder(orderDTO)).Returns(123);

            // Act
            var result = _shopController.OrdersRequest(orderDTO) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().Be(123);
        }

        [Fact]
        public void OrdersRequest_ShouldReturnZero_WhenOrderProcessingFails()
        {
            // Arrange
            var orderDTO = new OrderDTO
            {
                UserId = 1,
                ShippingDetails = new ShippingDetails
                {
                    Country = "Serbia",
                    City = "Belgrade",
                    Address = "Bulevar 12",
                    Number = "0611111111"
                },
                TotalPrice = 50.00,
                Items = new List<OrderItem> { new OrderItem { Id = 1, Quantity = 2 } }
            };

            A.CallTo(() => _shopService.processOrder(orderDTO)).Returns(0);

            // Act
            var result = _shopController.OrdersRequest(orderDTO) as ObjectResult;

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
            result.Value.Should().Be(0);
        }

        #endregion
    }
}