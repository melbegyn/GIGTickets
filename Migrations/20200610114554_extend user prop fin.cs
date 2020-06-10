using Microsoft.EntityFrameworkCore.Migrations;

namespace GIGTickets.Migrations
{
    public partial class extenduserpropfin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Ticket_ticketId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "ticketId",
                table: "AspNetUsers",
                newName: "TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_ticketId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_TicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Ticket_TicketId",
                table: "AspNetUsers",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Ticket_TicketId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "TicketId",
                table: "AspNetUsers",
                newName: "ticketId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_TicketId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_ticketId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Ticket_ticketId",
                table: "AspNetUsers",
                column: "ticketId",
                principalTable: "Ticket",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
