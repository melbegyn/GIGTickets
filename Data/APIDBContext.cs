using GIGTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace GIGTickets.Data
{
    public class APIDBContext: DbContext
    {
        public APIDBContext(DbContextOptions<APIDBContext> options) : base(options) {
        }

        public DbSet<Concert> Concert { get; set; }

    }
}
