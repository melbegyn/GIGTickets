using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIGTickets.Models
{
    interface Event
    {
        public String Artist { get; set; }
        public DateTime EventDate { get; set; } 
        public int TicketPrice { get; set; }
        public int NumberTicketsAvailable { get; set; }

    }
}
