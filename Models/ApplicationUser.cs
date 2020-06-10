using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace GIGTickets.Models
{
    public class ApplicationUser: IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }

        // Extended data
        public Ticket Ticket { get; set; }
         
          

        // inherited data
        //public string UserName { get; set; }

        // inherited data
        //public string Email { get; set; }
        // public string Password { get; set; }

    }
}
