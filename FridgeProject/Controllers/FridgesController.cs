using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeProject.Models;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FridgesController : ControllerBase
    {
        private readonly DataContext _context;

        public FridgesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fridge>>> GetFridges()
        {
            return await _context.Fridges.ToListAsync();
        }

 
        [HttpGet("{id}")]
        public async Task<ActionResult<Fridge>> GetFridge(int id)
        {
            var fridge = await _context.Fridges.FindAsync(id);

            if (fridge == null)
            {
                return NotFound();
            }

            return fridge;
        }

        // PUT: api/Fridges/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFridge(int id, Fridge fridge)
        {
            if (id != fridge.FridgeId)
            {
                return BadRequest();
            }

            _context.Entry(fridge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FridgeExists(id))
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

        // POST: api/Fridges
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Fridge>> PostFridge(Fridge fridge)
        {
            _context.Fridges.Add(fridge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFridge", new { id = fridge.FridgeId }, fridge);
        }

        // DELETE: api/Fridges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFridge(int id)
        {
            var fridge = await _context.Fridges.FindAsync(id);
            if (fridge == null)
            {
                return NotFound();
            }

            _context.Fridges.Remove(fridge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FridgeExists(int id)
        {
            return _context.Fridges.Any(e => e.FridgeId == id);
        }
    }
}
