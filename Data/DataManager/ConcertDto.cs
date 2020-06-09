using GIGTickets.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIGTickets.Data.DataManager
{

    public class ConcertDto
    {

        public ConcertDto()
        {
        }

        public long Id { get; set; }

        public string TourName { get; set; }

        public String Artist { get; set; }

        public String Stage { get; set; }

        public DateTime ConcertDate { get; set; }


        public int NumberTicketsAvailable { get; set; }


        public int TicketPrice { get; set; }

        //[ForeignKey("ConcertId")]
        public ICollection<Ticket> Tickets { get; set; }

    }
        /*public ConcertDto()
        {
        }

        public long Id { get; set; }

        public string TourName { get; set; }
 
        public String Artist { get; set; }
 
        public String Stage { get; set; }
 
        public DateTime ConcertDate { get; set; }

 
        public int NumberTicketsAvailable { get; set; }

 
        public int TicketPrice { get; set; }

        //[ForeignKey("ConcertId")]
        public ICollection<Ticket> Tickets { get; set; }

        public ConcertDto GetDto(long id)
        {
           // _context.ChangeTracker.LazyLoadingEnabled = true;

            using (var context = new APIDBContext())
            {
                var author = context.Concert
                       .SingleOrDefault(b => b.Id == id);
                return ConcertDtoMapper.MapToDto(author);
            }
        }

        public void Add(Concert entity)
        {
            _context.Author.Add(entity);
            _context.SaveChanges();
        }

    }
        */

    public static class ConcertDtoMapper
    {
    public static ConcertDto MapToDto(Concert concert)
        {
            return new ConcertDto()
            {
                Id = concert.Id,
                TourName = concert.TourName,
                Artist = concert.Artist,
                ConcertDate = concert.ConcertDate,
                NumberTicketsAvailable = concert.NumberTicketsAvailable,
                Stage = concert.Stage,
                TicketPrice = concert.TicketPrice,

                Tickets = new List<Ticket>() {
                    new Ticket { Category = "VIP", ConcertId = concert.Id, Price = concert.TicketPrice }

                }     
 
                //AuthorContact = new AuthorContactDto()
                //{
                //    AuthorId = author.Id,
                //     Address = author.AuthorContact.Address,
                //     ContactNumber = author.AuthorContact.ContactNumber
                // }
            };
        }
    } 
}
