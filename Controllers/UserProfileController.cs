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
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            string userId = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;

            var user = _context.Users.FirstOrDefault(c => c.Id == userId);

            var email = user.Email;

            //var user = await _userManager.GetUserAsync(HttpContext.User);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName
            };
        }

        // POST: api/UserProfile
        [HttpPut("{id}")]
        public async Task<ActionResult<ApplicationUser>> Put(String idString, [FromBody] ApplicationUser user)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;

            var userInDb = _context.Users.FirstOrDefault(c => c.Id == idString);
             
            await _userManager.UpdateAsync(user);

            if (userInDb != null)
            {
                userInDb.Ticket = user.Ticket;
            }

            await _context.SaveChangesAsync();

            return AcceptedAtAction("GetUserProfile", new { id = userInDb.Id }, userInDb);
            // return AcceptedAtAction("GetConcert", new { id = concert.Id }, concert);
        }

    }
}