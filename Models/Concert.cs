using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GIGTickets.Models
{
    public class Concert
    {

        [Key]
        public int Id { get; set; }

        [Display(Name = "Tour")]
        public String TourName { get; set; }
        public String Artist { get; set; }
        public String Stage { get; set; }

        [DataType(DataType.Date)]
        public DateTime ConcertDate { get; set; }
        public int NumberTicketsAvailable { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public int TicketPrice { get; set; }


    }
}
