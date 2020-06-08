using System;
using System.Collections.Generic;
using GIGTickets.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GIGTickets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcertsController : ControllerBase
    {
        // GET: api/<ConcertsController>
        [HttpGet]
        public IEnumerable<Concert> Get()
        {
            List<Concert> concertsList = new List<Concert>()
            {
                new Concert() { Id = 1, TourName = "Farewell Yellow Brick Road", Artist="Elton John", Stage="American Airlines Center",
                     ConcertDate=DateTime.Parse("2020-6-26"), NumberTicketsAvailable=3500, TicketPrice=299, 
                }
            };
            return concertsList;
        }

        // GET api/<ConcertsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ConcertsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ConcertsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ConcertsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
