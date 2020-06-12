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
                      Id = 1,
                      Artist = "Elton John",
                      TourName = "Farewell Tour",
                      Stage = "American Center Airline",
                      ConcertDate = DateTime.Parse("2020-06-26T07:34:42-5:00"),
                      NumberTicketsAvailable = 2,
                      TicketPrice = 199,
                      Picture = "farewell_tour.png"
                  },
                  new Concert
                  {
                      Id = 2,
                      Artist = "Céline Dion",
                      TourName = "Courage Tour",
                      Stage = "American Center Airline",
                      ConcertDate = DateTime.Parse("2020-11-18T07:34:42-5:00"),
                      NumberTicketsAvailable = 1,
                      TicketPrice = 85,
                      Picture = "courage_tour.png"
                  },
                  new Concert
                  {
                      Id = 3,
                      Artist = "Harry Styles",
                      TourName = "Love on Tour",
                      Stage = "The O2 Arena",
                      ConcertDate = DateTime.Parse("2020-09-15T07:34:42-5:00"),
                      NumberTicketsAvailable = 2,
                      TicketPrice = 230,
                      Picture = "love_on_tour.png"
                  },
                new Concert
                {
                    Id = 4,
                    Artist = "Rammstein",
                    TourName = "Europe Stadium Tour",
                    Stage = "Stade de France",
                    ConcertDate = DateTime.Parse("2020-12-05T07:34:42-5:00"),
                    NumberTicketsAvailable = 1,
                    TicketPrice = 150,
                    Picture = "europe_stadium_tour.png"
                },
                new Concert
                {
                    Id = 5,
                    Artist = "Backstreet Boys",
                    TourName = "DNA World Tour",
                    Stage = "Jones Beach Theatre",
                    ConcertDate = DateTime.Parse("2021-04-14T07:34:42-5:00"),
                    NumberTicketsAvailable = 0,
                    TicketPrice = 90,
                    Picture = "dna__world_tour.png"
                },
                new Concert
                {
                    Id = 6,
                    Artist = "Green Day",
                    TourName = "Mega Tour",
                    Stage = "The Forum",
                    ConcertDate = DateTime.Parse("2021-07-25T07:34:42-5:00"),
                    NumberTicketsAvailable = 1,
                    TicketPrice = 75,
                    Picture = "mega_tour.png"
                }
              );       
            
            
            builder.Entity<Ticket>().HasData(

                        // Elton John
                        new Ticket { Id = 1, ConcertId = 1, UserId = null, Category = "VIP", Price = 199 },
                        new Ticket { Id = 2, ConcertId = 1, UserId = null, Category = "VIP", Price = 199 },

                        // Céline Dion
                        new Ticket { Id = 3, ConcertId = 2, UserId = null, Category = "Standing", Price = 85 },

                        // Harry Styles
                        new Ticket { Id = 4, ConcertId = 3, UserId = null, Category = "Cat 2", Price = 230 },
                        new Ticket { Id = 5, ConcertId = 3, UserId = null, Category = "Cat 3", Price = 230 },
                        
                        // Rammstein
                        new Ticket { Id = 6, ConcertId = 4, UserId = null, Category = "VIP", Price = 150 },
                        new Ticket { Id = 7, ConcertId = 4, UserId = null, Category = "Cat 4", Price = 150 },
                        new Ticket { Id = 8, ConcertId = 4, UserId = null, Category = "Cat 4", Price = 150 },

                        // Backstreet Boys
                        new Ticket { Id = 9, ConcertId = 5, UserId = null, Category = "Cat 3", Price = 90 }, 

                        // Green Day
                        new Ticket { Id = 10, ConcertId = 6, UserId = null, Category = "Standing", Price = 75 }
                    );



            /*  builder.Entity<ApplicationUser>().HasData(



              // USER ACCOUNT
              new ApplicationUser { Id = "6616551dfgfgf5655", NormalizedEmail= "john.doe@gmail.com" , Email = "john.doe@gmail.com", FullName = "John Doe", PasswordHash="john", UserName = "JDoe", NormalizedUserName = "JDoe", homeAddress = "807 South Flower Street, 90017 Los Angeles" },

                          // ADMIN ACCOUNT
                          new ApplicationUser { Id = "3211ddsdf551sdfea", NormalizedEmail = "admin@gigtickets.com", Email = "admin@gigtickets.com", FullName = "admin", PasswordHash = "admin", UserName = "Admin", NormalizedUserName = "Admin", homeAddress = "7th Malcolm AV, 90025 Los Angeles" }


              );


              */
        }


    }
}
