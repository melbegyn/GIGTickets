using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GIGTickets.Data;
using GIGTickets.Models;
using Microsoft.AspNetCore.Routing;

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
        public async Task<ActionResult<IEnumerable<Concert>>> GetConcerts()
        {
            return await _context.Concert.ToListAsync();
        }

        // GET: api/Concert/5
        [HttpGet("{id}")]
        public ActionResult<Concert> GetConcert(int id)
        {
            var concert = _context.Concert.FirstOrDefault(a => a.Id == id);

            //var concert = _context.Concert.Include(p => p.Tickets).Where(p => p.Id == id).Find(id);
           // var concert = _context.Concert
           //      .Include(x => x.Tickets)
           //      .SingleOrDefaultAsync(m => m.Id == id);

            return Ok(concert);
        }

        // POST: api/Concert
        [HttpPost]
        public async Task<ActionResult<Concert>> PostConcert([FromBody] Concert concert)
        {
            _context.Concert.Add(concert);

            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetConcert", new { id = concert.Id }, concert);
            return AcceptedAtAction("GetConcert", new { id = concert.Id }, concert);
        }

        // PUT: api/Concert/5
        [HttpPut("{id}")]
        [Route("api/Concert/{id}")]
        public async Task<IActionResult> PutConcert(int id, [FromBody] Concert concert)
        {
            if (id != concert.Id)
            {
                ModelState.AddModelError("Id", "Invalid Id");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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

            return AcceptedAtAction("GetConcert", new { id = concert.Id }, concert);

        }

        // DELETE: api/Concert/5
        [HttpDelete("{id}")]
        public ActionResult<Concert> DeleteConcert(int id)
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
