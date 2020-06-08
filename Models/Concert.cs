using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GIGTickets.Models
{
    public class Concert
    {

        [Key]
        public int Id { get; set; }


        [Required]
        public String TourName { get; set; }
        [Required]
        public String Artist { get; set; }
        [Required]
        public String Stage { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime ConcertDate { get; set; }

        [Required]
        public int NumberTicketsAvailable { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public int TicketPrice { get; set; }


    }
}
