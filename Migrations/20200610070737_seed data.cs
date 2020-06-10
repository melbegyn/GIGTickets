using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GIGTickets.Migrations
{
    public partial class seeddata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "Concert",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Concert",
                columns: new[] { "Id", "Artist", "ConcertDate", "NumberTicketsAvailable", "Picture", "Stage", "TicketPrice", "TourName" },
                values: new object[] { 1, "Elton John", new DateTime(2008, 5, 1, 5, 34, 42, 0, DateTimeKind.Local), 5, "rocketman.png", "American Center Airline", 199m, "Rocketman Tour" });

            migrationBuilder.InsertData(
                table: "Ticket",
                columns: new[] { "Id", "Category", "ConcertId", "Price" },
                values: new object[] { 1, "VIP", 1, 199m });

            migrationBuilder.InsertData(
                table: "Ticket",
                columns: new[] { "Id", "Category", "ConcertId", "Price" },
                values: new object[] { 2, "VIP", 1, 199m });
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
                table: "Concert",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Concert");
        }
    }
}
