using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GIGTickets.Data;
using GIGTickets.Models;

namespace GIGTickets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcertController : ControllerBase
    {
        private readonly APIDBContext _context;

        public ConcertController(APIDBContext context)
        {
            _context = context;
        }

        // GET: api/Concert
        [HttpGet]
        public ActionResult<List<Concert>> Get()
        {
            return Ok(_context.Concert.ToList());
        }

        // GET: api/Concert/5
        [HttpGet("{id}")]
        public ActionResult<Concert> Get(int id)
        {
            var concert = _context.Concert.FirstOrDefault(a => a.Id == id);

            return Ok(concert);
        }

        // POST: api/Concert
        [HttpPost]
        public ActionResult<Concert> PostConcert(Concert concert)
        {
            _context.Concert.Add(concert);
            _context.SaveChanges();
            return Ok(concert);
            // return CreatedAtAction("GetConcert", new { id = concert.Id }, concert);
        }

        public ActionResult<Concert> PutConcert(Concert concert)
        {
            var concertInDb = _context.Concert.FirstOrDefault(a => a.Id == concert.Id);
            concertInDb.TourName = concert.TourName;
            concertInDb.Stage = concert.Stage;
            concertInDb.Artist = concert.Artist;
            concertInDb.ConcertDate = concert.ConcertDate;
            concertInDb.NumberTicketsAvailable = concert.NumberTicketsAvailable;
            concertInDb.TicketPrice = concert.TicketPrice;

            _context.SaveChanges();
            return Ok(concert);
        }

        // PUT: api/Concert/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /*[HttpPut("{id}")]
        public async Task<IActionResult> PutConcert(int id, Concert concert)
        {
            if (id != concert.Id)
            {
                return BadRequest();
            }

            _context.Entry(concert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConcertExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // DELETE: api/Concert/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Concert>> DeleteConcert(int id)
        {
            var concertInDb = _context.Concert.FirstOrDefault(a => a.Id == id);
            if (concertInDb == null)
            {
                return NotFound();
            }

            _context.Remove(concertInDb);
            _context.SaveChanges();

            return Ok(concertInDb);
        }

        private bool ConcertExists(int id)
        {
            return _context.Concert.Any(e => e.Id == id);
        }

 
    }
}
