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
        //public async Task<ActionResult<IEnumerable<Concert>>> GetConcert()
        public ActionResult<List<Concert>> Get()
        {
            return _context.Concert.ToList();
        }

        // GET: api/Concert/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Concert>> GetConcert(int id)
        {
            var concert = await _context.Concert.FindAsync(id);

            if (concert == null)
            {
                return NotFound();
            }

            return concert;
        }

        // PUT: api/Concert/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
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
        }

        // POST: api/Concert
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Concert>> PostConcert(Concert concert)
        {
            _context.Concert.Add(concert);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConcert", new { id = concert.Id }, concert);
        }

        // DELETE: api/Concert/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Concert>> DeleteConcert(int id)
        {
            var concert = await _context.Concert.FindAsync(id);
            if (concert == null)
            {
                return NotFound();
            }

            _context.Concert.Remove(concert);
            await _context.SaveChangesAsync();

            return concert;
        }

        private bool ConcertExists(int id)
        {
            return _context.Concert.Any(e => e.Id == id);
        }
    }
}
