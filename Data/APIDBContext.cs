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

        public DbSet<Ticket> Ticket { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);



            builder.Entity<Concert>()
                .HasMany(c => c.Tickets);


        }
 

    }
}
