using GIGTickets.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIGTickets.Repository
{
    public interface IConcertRepository : IDisposable
    {
        IEnumerable<Concert> GetConcerts();
        Concert GetConcertByID(int concertId);
        void InsertConcert(Concert concert);
        void DeleteConcert(int concertId);
        void UpdateConcert(Concert concert);
        void Save();
    }
}
