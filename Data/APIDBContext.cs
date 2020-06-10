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

            base.OnModelCreating(builder);

/*
            builder.Entity<Ticket>()
    .HasKey(bc => new { bc.ConcertId, bc.UserId });*/

            builder.Entity<Ticket>()
                .HasOne(bc => bc.Concert)
                .WithMany(b => b.Tickets)
                .HasForeignKey(bc => bc.ConcertId);

            builder.Entity<Ticket>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.Tickets)
                .HasForeignKey(bc => bc.UserId);




            builder.Entity<Concert>()
                   .HasMany(c => c.Tickets);

 

            builder.Entity<ApplicationUser>()
                   .HasMany(c => c.Tickets);




 
             builder.Entity<Concert>().HasData(
                  new Concert
                  {
                      Id = 100,
                      Artist = "Elton John",
                      TourName = "Rocketman Tour",
                      Stage = "American Center Airline",
                      ConcertDate = DateTime.Parse("2008-05-01T07:34:42-5:00"),
                      NumberTicketsAvailable = 5,
                      TicketPrice = 199,
                      Picture = "rocketman.png"
                  }
              );        builder.Entity<Ticket>().HasData(
                        new Ticket { Id = 7, ConcertId = 100, UserId = null, Category = "VIP", Price = 199 },
                        new Ticket { Id = 20, ConcertId = 100, UserId = null, Category = "VIP", Price = 199 }
                    );
       


        }


    }
}
