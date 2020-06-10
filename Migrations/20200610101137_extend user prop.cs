using Microsoft.EntityFrameworkCore.Migrations;

namespace GIGTickets.Migrations
{
    public partial class extenduserprop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ticketId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ticketId",
                table: "AspNetUsers",
                column: "ticketId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Ticket_ticketId",
                table: "AspNetUsers",
                column: "ticketId",
                principalTable: "Ticket",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Ticket_ticketId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ticketId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ticketId",
                table: "AspNetUsers");
        }
    }
}
