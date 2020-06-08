using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GIGTickets.Migrations
{
    public partial class InitialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Concert",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourName = table.Column<string>(nullable: true),
                    Artist = table.Column<string>(nullable: true),
                    Stage = table.Column<string>(nullable: true),
                    ConcertDate = table.Column<DateTime>(nullable: false),
                    NumberTicketsAvailable = table.Column<int>(nullable: false),
                    TicketPrice = table.Column<decimal>(type: "decimal(18, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concert", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Concert");
        }
    }
}
