using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GIGTickets.Data;
using GIGTickets.Models;
using System.Net.Http;

namespace GIGTickets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly APIDBContext _context;

        public TicketController(APIDBContext context)
        {
            _context = context;
        }

        // GET: api/Ticket
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
        {
            return await _context.Ticket.ToListAsync();
        }


        [Route("api/Ticket/{param1}")]
        public ActionResult<List<Concert>> Get([FromQuery] int param1)
        {
            List<Ticket> ticketsList =  _context.Ticket.Where(f => f.ConcertId == param1).ToList();
            //return  await _context.Ticket.Where(f => f.ConcertId == param1).ToListAsync();
           
            return Ok(ticketsList);
        }

        // GET: api/Ticket

        [HttpGet]
        [Route("AllTickets/{param1}")] //   /api/example/get1/1?param2=4
        public ActionResult<IEnumerable<Ticket>> GetTicketsById([FromQuery]int param1)
        {
            List<Ticket> ticketsList = _context.Ticket.Where(f => f.Id == param1).ToList();
           
            return Ok(ticketsList);
        }

       /* [HttpGet("{concertId}")]
        [Route("api/AllTickets/")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketsById(int concertId)
        { 
            List<Ticket> tickets = await _context.Ticket.Where(f => f.Id == concertId).ToListAsync();
            return tickets;

        }*/



        // GET: api/Ticket/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: api/Ticket/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        // POST: api/Ticket
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            _context.Ticket.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Ticket/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        private bool TicketExists(int id)
        {
            return _context.Ticket.Any(e => e.Id == id);
        }
    }
}
