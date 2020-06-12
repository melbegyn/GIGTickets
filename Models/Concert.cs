using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GIGTickets.Models
{
    public class Concert: Event
    {
        public Concert()
        {
            Tickets = new HashSet<Ticket>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime EventDate { get; set; }

         
        [Required]
        public int NumberTicketsAvailable { get; set; }
         

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public int TicketPrice { get; set; }

        [Required]
        public String Artist { get; set; }


        // ******** Concert properties

        [Required]
        public string Stage { get; set; }

        [Required]
        public String TourName { get; set; }

        [Required]
        public String Picture { get; set; }
         
        public virtual ICollection<Ticket> Tickets { get; set; }

    }
}
