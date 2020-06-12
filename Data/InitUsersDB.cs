using GIGTickets.Data;
using GIGTickets.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIGTickets
{
    public class InitUsersDB
    
{
        private APIDBContext _context;

        public InitUsersDB(APIDBContext context)
        {
            _context = context;
        }

        public async void Initialize()
        {
             
            var user = new ApplicationUser
            {
          
                NormalizedEmail = "admin@gigtickets.com",
                Email = "admin@gigtickets.com",
                FullName = "admin user", 
                UserName = "adminuser",
                NormalizedUserName = "adminuser",
                homeAddress = "7th Malcolm AV, 90025 Los Angeles", 
                EmailConfirmed = true, 
                SecurityStamp = Guid.NewGuid().ToString("D")
            };


            if (!_context.Users.Any(u => u.UserName == user.UserName))
            {
                var password = new PasswordHasher<ApplicationUser>();
                var hashed = password.HashPassword(user,"admin");
                user.PasswordHash = hashed;

                var userStore = new UserStore<ApplicationUser>(_context);
                var result = userStore.CreateAsync(user);

            }
             
            await  _context.SaveChangesAsync();
    }
 

    }
}
