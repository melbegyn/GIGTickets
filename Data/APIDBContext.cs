using GIGTickets.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace GIGTickets.Data
{
    public class APIDBContext: IdentityDbContext<ApplicationUser>
    {
        public APIDBContext(DbContextOptions<APIDBContext> options) : base(options) {

       
        
        }
 
        public DbSet<Concert> Concert { get; set; }

        public DbSet<Ticket> Ticket { get; set; }

   
        protected override void OnModelCreating(ModelBuilder builder)
        {
          
            builder.Entity<Concert>()
                .HasMany(c => c.Tickets);
 

            builder.Entity<Concert>().HasData(
                new Concert
                {
                    Id = 1,
                    Artist = "Elton John",
                    TourName = "Rocketman Tour",
                    Stage = "American Center Airline",
                    ConcertDate = DateTime.Parse("2008-05-01T07:34:42-5:00"),
                    NumberTicketsAvailable = 5,
                    TicketPrice = 199,
                    Picture = "rocketman.png" 
                } 
            );



            builder.Entity<Ticket>().HasData(
                new Ticket { Id = 1, ConcertId = 1, Category = "VIP", Price = 199 },
                new Ticket { Id = 2, ConcertId = 1, Category = "VIP", Price = 199 }
            );

 


             base.OnModelCreating(builder);
        }
 

    }
}
