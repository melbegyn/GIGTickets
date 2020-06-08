using GIGTickets.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace GIGTickets.Data
{
    public class APIDBContext: DbContext
    {
        public APIDBContext(DbContextOptions<APIDBContext> options) : base(options) {
        }

        public DbSet<Concert> Concert { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Concert>().HasData(
               new Concert()
               {
                   Id = 1,
                   TourName = "Farewell Yellow Brick Road",
                   Artist = "Elton John",
                   Stage = "American Airlines Center",
                   ConcertDate = DateTime.Parse("2020-6-26"),
                   NumberTicketsAvailable = 3500,
                   TicketPrice = 299,
               }
            );
        }

    }
}
