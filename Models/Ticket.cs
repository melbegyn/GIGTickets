using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace GIGTickets.Models
{
    public class Ticket
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public String Category { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public int Price { get; set; }

        //[ForeignKey("Concert")]
        [Required]
        public int ConcertId { get; set; }
        public Concert Concert { get; set; }

        //[Required]
        public String UserId { get; set; }
   
        public ApplicationUser User { get; set; }
    }
}
