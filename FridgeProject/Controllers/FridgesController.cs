using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class FridgesController : ControllerBase
    {
        private readonly DataContext _context;

        public FridgesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("own/all/{email?}")]
        public async Task<ActionResult<IEnumerable<Fridge>>> GetOwnFridges(string email)
        {
            return await _context.Fridges
                .Where(x => x.User.Email == (email != null && HttpContext.User.IsInRole("Admin") ? email : HttpContext.User.Identity.Name))
                .ToListAsync();
        }

        [HttpGet("shared/all/{email?}")]
        public async Task<ActionResult<IEnumerable<Fridge>>> GetSharedFridges(string email)
        {
            return await _context.Subscribers
                .Where(x => x.User.Email == (email != null && HttpContext.User.IsInRole("Admin") ? email : HttpContext.User.Identity.Name))
                .Select(x => x.Fridge)
                .ToListAsync();
        }

        [HttpGet("one/{id}")]
        public async Task<ActionResult<Fridge>> GetFridge(int id)
        {
            var fridge = await _context.Fridges.Include(x => x.User).SingleOrDefaultAsync(x => x.FridgeId == id);

            if (fridge == null)
            {
                return NotFound();
            }

            if (HttpContext.User.IsInRole("User") && fridge.User.Email != HttpContext.User.Identity.Name)
            {
                return BadRequest("it is not your fridge");
            }

            fridge.User = null;
            return fridge;
        }

        [HttpPut("edit")]
        public async Task<IActionResult> PutFridge(Fridge model)
        {
            var fridge = await _context.Fridges.Include(x => x.User).SingleOrDefaultAsync(x => x.FridgeId == model.FridgeId);

            if (fridge == null)
            {
                return NotFound();
            }

            if (HttpContext.User.IsInRole("User") && fridge.User.Email != HttpContext.User.Identity.Name)
            {
                return BadRequest("it is not your fridge");
            }

            fridge.FridgeName = model.FridgeName;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("create")]
        public async Task<ActionResult<Fridge>> PostFridge(Fridge fridge)
        {
            if (HttpContext.User.IsInRole("User"))
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

                fridge.User = user;
                fridge.UserId = user.UserId;
            }
            _context.Fridges.Add(fridge);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFridge", new { id = fridge.FridgeId }, fridge);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteFridge(int id)
        {
            var fridge = await _context.Fridges.Include(x => x.User).Include(x => x.Subscribers).SingleOrDefaultAsync(x => x.FridgeId == id);
            if (fridge == null)
            {
                return NotFound();
            }
            if (HttpContext.User.IsInRole("User") && fridge.User.Email != HttpContext.User.Identity.Name)
            {
                return BadRequest("it is not your fridge");
            }
            foreach (var subscriber in fridge.Subscribers)
            {
                _context.Subscribers.Remove(subscriber);
            }

            _context.Fridges.Remove(fridge);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
