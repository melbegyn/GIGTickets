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
             
                //var context = serviceProvider.GetService<APIDBContext>();


                /*   string[] roles = new string[] { "Owner", "Administrator", "Manager", "Editor", "Buyer", "Business", "Seller", "Subscriber" };

                   foreach (string role in roles)
                   {
                       var roleStore = new RoleStore<IdentityRole>(context);

                       if (!context.Roles.Any(r => r.Name == role))
                       {
                           roleStore.CreateAsync(new IdentityRole(role));
                       }
                   }*/


                var user = new ApplicationUser
        {
            // FirstName = "XXXX",
            // LastName = "XXXX",
            
            NormalizedEmail = "admin@gigtickets.com",
            Email = "admin@gigtickets.com",
            FullName = "admin user",
             
            UserName = "adminuser",
            NormalizedUserName = "adminuser",
            homeAddress = "7th Malcolm AV, 90025 Los Angeles",
       
             
          //  PhoneNumber = "+111111111111",
            EmailConfirmed = true,
           // PhoneNumberConfirmed = true,
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

            // AssignRoles(serviceProvider, user.Email, roles);

            await  _context.SaveChangesAsync();
    }

/*    public static async Task<IdentityResult> AssignRoles(IServiceProvider services, string email, string[] roles)
    {
        UserManager<ApplicationUser> _userManager = services.GetService<UserManager<ApplicationUser>>();
        ApplicationUser user = await _userManager.FindByEmailAsync(email);
        var result = await _userManager.AddToRolesAsync(user, roles);

        return result;
    }*/

}
}
