using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;

namespace GIGTickets.Models
{
    public class ApplicationUser: IdentityUser
    {

        public ApplicationUser()
        {
            Tickets = new HashSet<Ticket>(); 
        }

        [Required]
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }

        // Extended data
        //public Ticket Ticket { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }


        // inherited data
        //public string UserName { get; set; }

        // inherited data
        //public string Email { get; set; }
        // public string Password { get; set; }

    }
}
