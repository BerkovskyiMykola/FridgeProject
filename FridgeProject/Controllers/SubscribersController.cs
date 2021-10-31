using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeProject.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class SubscribersController : ControllerBase
    {
        private readonly DataContext _context;

        public SubscribersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("all/{fridgeId}")]
        public async Task<ActionResult<IEnumerable>> GetSubscribers(int fridgeId)
        {
            return await _context.Subscribers
                .Include(x => x.User)
                .Where(x => x.FridgeId == fridgeId && (HttpContext.User.IsInRole("User") ? x.User.Email == HttpContext.User.Identity.Name : true))
                .Select(x => new { x.SubscriberId, x.User.UserId, x.User.Email, x.User.Firstname, x.User.Lastname }).ToListAsync();
        }

        [HttpPost("add")]
        public async Task<ActionResult<Subscriber>> PostSubscriber(Subscriber subscriber)
        {
            if(subscriber.UserId == null || subscriber.FridgeId == null)
            {
                return BadRequest();
            }

            if(await _context.Subscribers.AnyAsync(x => x.UserId == subscriber.UserId && x.FridgeId == subscriber.FridgeId))
            {
                return BadRequest("User is added");
            }

            if (HttpContext.User.IsInRole("User"))
            {
                var fridge = await _context.Fridges.Include(x => x.User)
                    .SingleOrDefaultAsync(x => x.FridgeId == subscriber.FridgeId && x.User.Email == HttpContext.User.Identity.Name);

                if(fridge == null)
                {
                    return BadRequest();
                }
            }

            _context.Subscribers.Add(subscriber);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscriber", new { id = subscriber.SubscriberId }, subscriber);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSubscriber(int id)
        {
            var subscriber = await _context.Subscribers
                .Include(x => x.User)
                .Include(x => x.Fridge)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.SubscriberId == id);

            if (subscriber == null)
            {
                return NotFound();
            }

            if (HttpContext.User.IsInRole("User") && subscriber.Fridge.User.Email != HttpContext.User.Identity.Name)
            {
                return BadRequest("it is not your subscriber");
            }

            var products = await _context.Products
                .Where(x => x.FridgeId == subscriber.FridgeId && x.User.Email == HttpContext.User.Identity.Name)
                .ToListAsync();

            foreach (var product in products)
            {
                _context.Products.Remove(product);
            }

            _context.Subscribers.Remove(subscriber);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
