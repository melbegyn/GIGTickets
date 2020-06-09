using GIGTickets.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GIGTickets.Repository;

namespace GIGTickets.Data.DataManager
{
    public class ConcertDataManager : IDataRepository<Concert, ConcertDto>
    {
        readonly APIDBContext _context;

        public ConcertDataManager(APIDBContext context)
        {
            _context = context;
        }

        IEnumerable<Concert> IDataRepository<Concert, ConcertDto>.GetAll()
        {
            return _context.Concert
                   .Include(x => x.Tickets)
                   .ToList();
        }

        Concert IDataRepository<Concert, ConcertDto>.Get(long id)
        {
            var author = _context.Concert.SingleOrDefault(b => b.Id == id);

            return author;
        }

        ConcertDto IDataRepository<Concert, ConcertDto>.GetDto(long id)
        {
            _context.ChangeTracker.LazyLoadingEnabled = true;
             
                var concert = _context.Concert.SingleOrDefault(b => b.Id == id);

                return ConcertDtoMapper.MapToDto(concert);
            }

        public void Add(Concert entity)
        {
            _context.Concert.Add(entity);
            _context.SaveChanges();
        }

        public void Update(Concert entityToUpdate, Concert entity)
        {
            entityToUpdate = _context.Concert
                   .Include(a => a.Tickets)
                   .Single(b => b.Id == entityToUpdate.Id);

            // update the properties
            entityToUpdate.TourName = entity.TourName;
            entityToUpdate.Stage = entity.Stage;
            entityToUpdate.ConcertDate = entity.ConcertDate;
            entityToUpdate.NumberTicketsAvailable = entity.NumberTicketsAvailable;
            entityToUpdate.TicketPrice = entity.TicketPrice;
            entityToUpdate.Artist = entity.Artist;

            // ************* TICKETS LIST *************

            //entityToUpdate.Tickets = 

            //List<Ticket> Tickets = _context.ConcertTickets.ToList();
            //usersList.ForEach(a => { a.isAdult = 1; });
            //_context.SaveChanges();


            var deletedBooks = entityToUpdate.Tickets.Except(entity.Tickets).ToList();
            var addedBooks = entity.Tickets.Except(entityToUpdate.Tickets).ToList();

            deletedBooks.ForEach(bookToDelete =>
                entityToUpdate.Tickets.Remove(
                    entityToUpdate.Tickets
                        .First(b => b.Id == bookToDelete.Id)));

            foreach (var addedBook in addedBooks)
            {
                _context.Entry(addedBook).State = EntityState.Added;
            }

            _context.SaveChanges();
        }

        public void Delete(Concert entity)
        {
            throw new NotImplementedException();
        }
    }
     

}
 
