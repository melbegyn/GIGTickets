using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GIGTickets.Migrations
{
    public partial class deletebycascadetheticketsall : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Concert",
                keyColumn: "Id",
                keyValue: 100);

            migrationBuilder.InsertData(
                table: "Concert",
                columns: new[] { "Id", "Artist", "ConcertDate", "NumberTicketsAvailable", "Picture", "Stage", "TicketPrice", "TourName" },
                values: new object[] { 200, "Elton John", new DateTime(2008, 5, 1, 5, 34, 42, 0, DateTimeKind.Local), 2, "rocketman.png", "American Center Airline", 199m, "Rocketman Tour" });

            migrationBuilder.InsertData(
                table: "Concert",
                columns: new[] { "Id", "Artist", "ConcertDate", "NumberTicketsAvailable", "Picture", "Stage", "TicketPrice", "TourName" },
                values: new object[] { 201, "Elton John", new DateTime(2008, 5, 1, 5, 34, 42, 0, DateTimeKind.Local), 1, "rocketman.png", "American Center Airline", 86m, "Rocketman Tour" });

            migrationBuilder.InsertData(
                table: "Concert",
                columns: new[] { "Id", "Artist", "ConcertDate", "NumberTicketsAvailable", "Picture", "Stage", "TicketPrice", "TourName" },
                values: new object[] { 202, "Johnny Hallyday", new DateTime(2008, 5, 1, 5, 34, 42, 0, DateTimeKind.Local), 2, "rocketman.png", "Stage France", 230m, "Motar Tour" });

            migrationBuilder.InsertData(
                table: "Ticket",
                columns: new[] { "Id", "Category", "ConcertId", "Price", "UserId" },
                values: new object[,]
                {
                    { 1, "VIP", 200, 199m, null },
                    { 2, "Fosse", 200, 199m, null },
                    { 3, "Cat 3", 201, 86m, null },
                    { 4, "Cat 4", 202, 230m, null },
                    { 5, "VIP", 202, 230m, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Ticket",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Concert",
                keyColumn: "Id",
                keyValue: 200);

            migrationBuilder.DeleteData(
                table: "Concert",
                keyColumn: "Id",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "Concert",
                keyColumn: "Id",
                keyValue: 202);

            migrationBuilder.InsertData(
                table: "Concert",
                columns: new[] { "Id", "Artist", "ConcertDate", "NumberTicketsAvailable", "Picture", "Stage", "TicketPrice", "TourName" },
                values: new object[] { 100, "Elton John", new DateTime(2008, 5, 1, 5, 34, 42, 0, DateTimeKind.Local), 5, "rocketman.png", "American Center Airline", 199m, "Rocketman Tour" });

            migrationBuilder.InsertData(
                table: "Ticket",
                columns: new[] { "Id", "Category", "ConcertId", "Price", "UserId" },
                values: new object[] { 7, "VIP", 100, 199m, null });

            migrationBuilder.InsertData(
                table: "Ticket",
                columns: new[] { "Id", "Category", "ConcertId", "Price", "UserId" },
                values: new object[] { 20, "VIP", 100, 199m, null });
        }
    }
}
