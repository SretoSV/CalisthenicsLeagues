using CalisthenicsLeagues.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CalisthenicsLeagues.Context
{
    //dotnet add package Pomelo.EntityFrameworkCore.MySql
    //dotnet add package Microsoft.EntityFrameworkCore
    //dotnet add package Microsoft.EntityFrameworkCore.Design
    public class AppDbContext : DbContext
    {
        //dotnet ef migrations add NameOfMigration
        //dotnet ef database update
        private readonly PasswordHasher<string> passwordHasher = new PasswordHasher<string>();
        public DbSet<Application> Applications { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Shirt> Shirts { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>().ToTable("applications");
            modelBuilder.Entity<League>().ToTable("leagues");
            modelBuilder.Entity<Message>().ToTable("messages");
            modelBuilder.Entity<OrderItem>().ToTable("order_items");
            modelBuilder.Entity<Order>().ToTable("orders");
            modelBuilder.Entity<Shirt>().ToTable("shirts");
            modelBuilder.Entity<User>().ToTable("users");

            //Seed leagues
            modelBuilder.Entity<League>().HasData(
                new League { Id = 1, Name = "Legendary", Image = "Images/Leagues/Legendary.png" },
                new League { Id = 2, Name = "World-Class", Image = "Images/Leagues/World-Class.png" },
                new League { Id = 3, Name = "Pro", Image = "Images/Leagues/Pro.png" },
                new League { Id = 4, Name = "Semi-pro", Image = "Images/Leagues/Semi-pro.png" },
                new League { Id = 5, Name = "Amateur", Image = "Images/Leagues/Amateur.png" },
                new League { Id = 6, Name = "Beginner", Image = "Images/Leagues/Beginner.png" }
            );

            //Seed shirts
            modelBuilder.Entity<Shirt>().HasData(
                new Shirt
                {
                    Id = 1,
                    League = "Legendary", // ili "Street Workout League" ako koristiš string
                    ShirtImageBlackFront = "Images/Shirts/Legendary/shirtImageBlackFront.png",
                    ShirtImageBlackBack = "Images/Shirts/Legendary/shirtImageBlackBack.png",
                    ShirtImageWhiteFront = "Images/Shirts/Legendary/shirtImageWhiteFront.png",
                    ShirtImageWhiteBack = "Images/Shirts/Legendary/shirtImageWhiteBack.png",
                    Price = 19.99
                },
                new Shirt
                {
                    Id = 2,
                    League = "World-Class",
                    ShirtImageBlackFront = "Images/Shirts/WorldClass/shirtImageBlackFront.png",
                    ShirtImageBlackBack = "Images/Shirts/WorldClass/shirtImageBlackBack.png",
                    ShirtImageWhiteFront = "Images/Shirts/WorldClass/shirtImageWhiteFront.png",
                    ShirtImageWhiteBack = "Images/Shirts/WorldClass/shirtImageWhiteBack.png",
                    Price = 19.99
                },
                new Shirt
                {
                    Id = 3,
                    League = "Pro",
                    ShirtImageBlackFront = "Images/Shirts/Pro/shirtImageBlackFront.png",
                    ShirtImageBlackBack = "Images/Shirts/Pro/shirtImageBlackBack.png",
                    ShirtImageWhiteFront = "Images/Shirts/Pro/shirtImageWhiteFront.png",
                    ShirtImageWhiteBack = "Images/Shirts/Pro/shirtImageWhiteBack.png",
                    Price = 19.99
                },
                new Shirt
                {
                    Id = 4,
                    League = "Semi-pro",
                    ShirtImageBlackFront = "Images/Shirts/SemiPro/shirtImageBlackFront.png",
                    ShirtImageBlackBack = "Images/Shirts/SemiPro/shirtImageBlackBack.png",
                    ShirtImageWhiteFront = "Images/Shirts/SemiPro/shirtImageWhiteFront.png",
                    ShirtImageWhiteBack = "Images/Shirts/SemiPro/shirtImageWhiteBack.png",
                    Price = 19.99
                },
                new Shirt
                {
                    Id = 5,
                    League = "Amateur",
                    ShirtImageBlackFront = "Images/Shirts/Amateur/shirtImageBlackFront.png",
                    ShirtImageBlackBack = "Images/Shirts/Amateur/shirtImageBlackBack.png",
                    ShirtImageWhiteFront = "Images/Shirts/Amateur/shirtImageWhiteFront.png",
                    ShirtImageWhiteBack = "Images/Shirts/Amateur/shirtImageWhiteBack.png",
                    Price = 19.99
                },
                new Shirt
                {
                    Id = 6,
                    League = "Beginner",
                    ShirtImageBlackFront = "Images/Shirts/Beginner/shirtImageBlackFront.png",
                    ShirtImageBlackBack = "Images/Shirts/Beginner/shirtImageBlackBack.png",
                    ShirtImageWhiteFront = "Images/Shirts/Beginner/shirtImageWhiteFront.png",
                    ShirtImageWhiteBack = "Images/Shirts/Beginner/shirtImageWhiteBack.png",
                    Price = 19.99
                }
            );

            //Seed users
            modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "Ana123",
                Name = "Ana",
                Surname = "Anic",
                Country = "Serbia",
                DateOfBirth = new DateTime(2000, 05, 15),
                Email = "anaanic@gmail.com",
                Password = passwordHasher.HashPassword(null, "123"),
                Image = "Images\\7d40b63c-7ba5-4566-991d-f1d2935013b2.jpg",
                Instagram = "anci",
                League = 1,
                Accepted = true,
                Admin = true
            },
            new User
            {
                Id = 2,
                Username = "Nikola123",
                Name = "Nikola",
                Surname = "Nikolic",
                Country = "Serbia",
                DateOfBirth = new DateTime(2000, 05, 15),
                Email = "nikola@gmail.com",
                Password = passwordHasher.HashPassword(null, "123"),
                Image = "Images\\366a0530-ab16-4300-8b72-563dc332cc79.jpg",
                Instagram = "nikola",
                League = 5,
                Accepted = true,
                Admin = false
            }
        );


            base.OnModelCreating(modelBuilder);
        }
    }
}
