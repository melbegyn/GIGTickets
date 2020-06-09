using GIGTickets.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

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

            base.OnModelCreating(builder);
        }
 

    }
}
