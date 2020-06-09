using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
 
            var user = await _userManager.FindByIdAsync(userId);
                return new
                {
                    user.FullName,
                    user.Email,
                    user.UserName
                };
            }
    }
}