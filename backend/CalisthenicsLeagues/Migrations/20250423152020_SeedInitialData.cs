using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CalisthenicsLeagues.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "leagues",
                columns: new[] { "Id", "Image", "Name" },
                values: new object[,]
                {
                    { 1, "Images/Leagues/Legendary.png", "Legendary" },
                    { 2, "Images/Leagues/World-Class.png", "World-Class" },
                    { 3, "Images/Leagues/Pro.png", "Pro" },
                    { 4, "Images/Leagues/Semi-pro.png", "Semi-pro" },
                    { 5, "Images/Leagues/Amateur.png", "Amateur" },
                    { 6, "Images/Leagues/Beginner.png", "Beginner" }
                });

            migrationBuilder.InsertData(
                table: "shirts",
                columns: new[] { "Id", "League", "Price", "ShirtImageBlackBack", "ShirtImageBlackFront", "ShirtImageWhiteBack", "ShirtImageWhiteFront" },
                values: new object[,]
                {
                    { 1, "Legendary", 19.989999999999998, "Images/Shirts/Legendary/shirtImageBlackBack.png", "Images/Shirts/Legendary/shirtImageBlackFront.png", "Images/Shirts/Legendary/shirtImageWhiteBack.png", "Images/Shirts/Legendary/shirtImageWhiteFront.png" },
                    { 2, "World-Class", 19.989999999999998, "Images/Shirts/WorldClass/shirtImageBlackBack.png", "Images/Shirts/WorldClass/shirtImageBlackFront.png", "Images/Shirts/WorldClass/shirtImageWhiteBack.png", "Images/Shirts/WorldClass/shirtImageWhiteFront.png" },
                    { 3, "Pro", 19.989999999999998, "Images/Shirts/Pro/shirtImageBlackBack.png", "Images/Shirts/Pro/shirtImageBlackFront.png", "Images/Shirts/Pro/shirtImageWhiteBack.png", "Images/Shirts/Pro/shirtImageWhiteFront.png" },
                    { 4, "Semi-pro", 19.989999999999998, "Images/Shirts/SemiPro/shirtImageBlackBack.png", "Images/Shirts/SemiPro/shirtImageBlackFront.png", "Images/Shirts/SemiPro/shirtImageWhiteBack.png", "Images/Shirts/SemiPro/shirtImageWhiteFront.png" },
                    { 5, "Amateur", 19.989999999999998, "Images/Shirts/Amateur/shirtImageBlackBack.png", "Images/Shirts/Amateur/shirtImageBlackFront.png", "Images/Shirts/Amateur/shirtImageWhiteBack.png", "Images/Shirts/Amateur/shirtImageWhiteFront.png" },
                    { 6, "Beginner", 19.989999999999998, "Images/Shirts/Beginner/shirtImageBlackBack.png", "Images/Shirts/Beginner/shirtImageBlackFront.png", "Images/Shirts/Beginner/shirtImageWhiteBack.png", "Images/Shirts/Beginner/shirtImageWhiteFront.png" }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "Accepted", "Admin", "Country", "DateOfBirth", "Email", "Image", "Instagram", "league", "Name", "Password", "Surname", "Username" },
                values: new object[,]
                {
                    { 1, true, true, "Serbia", new DateTime(2000, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "anaanic@gmail.com", "Images\\7d40b63c-7ba5-4566-991d-f1d2935013b2.jpg", "anci", 1, "Ana", "AQAAAAIAAYagAAAAEJyN3MFFnzn1wM4ub0fxGKCfcL8If+oRC/JDg48++2nBQ8h1phBNRuT4NJy/+J0lbA==", "Anic", "Ana123" },
                    { 2, true, false, "Serbia", new DateTime(2000, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "nikola@gmail.com", "Images\\366a0530-ab16-4300-8b72-563dc332cc79.jpg", "nikola", 5, "Nikola", "AQAAAAIAAYagAAAAEJ7GnObPLBb20PLjWZclVKuud3wmOFDZUxmd6jrpIDN9b9UXp+sgh9qVrQtFNYFCgA==", "Nikolic", "Nikola123" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "leagues",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "leagues",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "leagues",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "leagues",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "leagues",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "leagues",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "shirts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "shirts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "shirts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "shirts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "shirts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "shirts",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
