using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GIGTickets.Data;
using GIGTickets.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GIGTickets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        private APIDBContext _context;

        public UserProfileController(UserManager<ApplicationUser> userManager, APIDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        { 
            string userId = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;

            var user = _context.Users.FirstOrDefault(c => c.Id == userId);

            var email = user.Email;
             
            return new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.UserName,
                user.homeAddress
            };
        }

        // PUT: api/UserProfile
        [HttpPut("{id}")]
        [Route("api/UserProfile/{id}")]
        public async Task<ActionResult<ApplicationUser>> Put(String idString, [FromBody] ApplicationUser user)
        {

            string userId = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
           
             
            var userInDb = _context.Users.FirstOrDefault(c => c.Id == userId);
            // Update it with the values from the view model
            userInDb.FullName = user.FullName;
            userInDb.UserName = user.UserName;
            userInDb.Email = user.Email;
            userInDb.Tickets = user.Tickets;
            userInDb.homeAddress = user.homeAddress;
            userInDb.PhoneNumber = user.PhoneNumber;
            

            try
            {
                await _userManager.UpdateAsync(userInDb);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
              

        return NoContent();
        }


        private bool UserExists(String id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
   }
 }
 