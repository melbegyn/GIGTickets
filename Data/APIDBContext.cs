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
                .HasForeignKey(bc => bc.ConcertId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Ticket>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.Tickets)
                .HasForeignKey(bc => bc.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Concert>()
                   .HasMany(c => c.Tickets);


            builder.Entity<ApplicationUser>()
                   .HasMany(c => c.Tickets);

             
 
             builder.Entity<Concert>().HasData(
                  new Concert
                  {
                      Id = 200,
                      Artist = "Elton John",
                      TourName = "Rocketman Tour",
                      Stage = "American Center Airline",
                      ConcertDate = DateTime.Parse("2008-05-01T07:34:42-5:00"),
                      NumberTicketsAvailable = 2,
                      TicketPrice = 199,
                      Picture = "rocketman.png"
                  },
                  new Concert
                  {
                      Id = 201,
                      Artist = "Elton John",
                      TourName = "Rocketman Tour",
                      Stage = "American Center Airline",
                      ConcertDate = DateTime.Parse("2008-05-01T07:34:42-5:00"),
                      NumberTicketsAvailable = 1,
                      TicketPrice = 86,
                      Picture = "rocketman.png"
                  },
                  new Concert
                  {
                      Id = 202,
                      Artist = "Johnny Hallyday",
                      TourName = "Motar Tour",
                      Stage = "Stage France",
                      ConcertDate = DateTime.Parse("2008-05-01T07:34:42-5:00"),
                      NumberTicketsAvailable = 2,
                      TicketPrice = 230,
                      Picture = "rocketman.png"
                  }
              );        builder.Entity<Ticket>().HasData(
                        new Ticket { Id = 1, ConcertId = 200, UserId = null, Category = "VIP", Price = 199 },
                        new Ticket { Id = 2, ConcertId = 200, UserId = null, Category = "Fosse", Price = 199 },
                        new Ticket { Id = 3, ConcertId = 201, UserId = null, Category = "Cat 3", Price = 86 },
                        new Ticket { Id = 4, ConcertId = 202, UserId = null, Category = "Cat 4", Price = 230 },
                        new Ticket { Id = 5, ConcertId = 202, UserId = null, Category = "VIP", Price = 230 }
                    );
       


        }


    }
}
