using GIGTickets.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GIGTickets.Repository;

namespace GIGTickets.Data.DataManager
{
    public class ConcertRepository : IConcertRepository, IDisposable
    {
        private APIDBContext context;

        public ConcertRepository(APIDBContext context)
        {
            this.context = context;
        }
 

   

        public void Update(Concert entityToUpdate, Concert entity)
        {
            
        }

        public void Delete(Concert entity)
        {
            throw new NotImplementedException();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Concert> GetConcerts()
        {
            return context.Concert
                   .Include(x => x.Tickets)
                   .ToList();
        }

        public Concert GetConcertByID(int concertId)
        {
            // return context.Students.Find(id);
            var concert = context.Concert.SingleOrDefault(b => b.Id == concertId);

            return concert;
        }

        public void InsertConcert(Concert concert)
        {
            context.Concert.Add(concert);
            context.SaveChanges();
        }

        public void DeleteConcert(int concertId)
        {
            Concert concert = context.Concert.Find(concertId);
            context.Concert.Remove(concert);
        }

        public void UpdateConcert(Concert concert)
        {
            /*entityToUpdate = _context.Concert
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
            */
            context.Entry(concert).State = EntityState.Modified;
             
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
     

