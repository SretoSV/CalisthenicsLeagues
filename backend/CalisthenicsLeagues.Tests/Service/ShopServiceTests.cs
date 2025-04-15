using CalisthenicsLeagues.DAO;
using CalisthenicsLeagues.DTO;
using CalisthenicsLeagues.Models;
using CalisthenicsLeagues.Service;
using FakeItEasy;
using FluentAssertions;
using Xunit;
using System.Collections.Generic;

namespace CalisthenicsLeagues.Tests.Service
{
    public class ShopServiceTests
    {
        private readonly ShopService _shopService;
        private readonly IShopDAO _shopDAO;

        public ShopServiceTests()
        {
            _shopDAO = A.Fake<IShopDAO>();
            _shopService = new ShopService(_shopDAO);
        }

        #region GetAllShirts Tests
        [Fact]
        public void GetAllShirts_ShouldReturnListOfShirts_WhenShirtsExist()
        {
            // Arrange
            var fakeShirts = new List<Shirt>
            {
                new Shirt { Id = 1, LeagueName = "Legendary", Price = 20.0 },
                new Shirt { Id = 2, LeagueName = "World-Class", Price = 25.0 }
            };

            A.CallTo(() => _shopDAO.GetAllShirts()).Returns(fakeShirts);

            // Act
            var result = _shopService.GetAllShirts();

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2);
            result.Should().BeEquivalentTo(fakeShirts);
        }

        [Fact]
        public void GetAllShirts_ShouldReturnEmptyList_WhenNoShirtsExist()
        {
            // Arrange
            A.CallTo(() => _shopDAO.GetAllShirts()).Returns(new List<Shirt>());

            // Act
            var result = _shopService.GetAllShirts();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty();
        }
        #endregion

        #region ProcessOrder Tests
        [Fact]
        public void ProcessOrder_ShouldReturnOrderId_WhenOrderIsProcessed()
        {
            // Arrange
            var orderDTO = new OrderDTO
            {
                UserId = 1,
                ShippingDetails = new ShippingDetails { 
                    Country = "Serbia",
                    City = "Belgrade",
                    Address = "Bulevar 12",
                    Number = "0611111111"
                },
                TotalPrice = 50.0,
                Items = new List<OrderItem>
                {
                    new OrderItem { Id = 1, Quantity = 2 },
                    new OrderItem { Id = 2, Quantity = 1 }
                }
            };

            A.CallTo(() => _shopDAO.InsertNewOrder(orderDTO.UserId, orderDTO.ShippingDetails, orderDTO.TotalPrice))
                .Returns(100);

            // Act
            var result = _shopService.processOrder(orderDTO);

            // Assert
            result.Should().Be(100);
            A.CallTo(() => _shopDAO.InsertOrderItems(A<OrderItem>.Ignored, 100))
                .MustHaveHappenedTwiceExactly();
        }

        [Fact]
        public void ProcessOrder_ShouldReturnZero_WhenOrderInsertionFails()
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
                TotalPrice = 50.0,
                Items = new List<OrderItem> { new OrderItem { Id = 1, Quantity = 2 } }
            };

            A.CallTo(() => _shopDAO.InsertNewOrder(orderDTO.UserId, orderDTO.ShippingDetails, orderDTO.TotalPrice)).Returns(0);

            // Act
            var result = _shopService.processOrder(orderDTO);

            // Assert
            result.Should().Be(0);
            //A.CallTo(() => _shopDAO.InsertOrderItems(A<OrderItem>.Ignored, A<int>.Ignored)).MustNotHaveHappened();
        }
        #endregion
    }
}