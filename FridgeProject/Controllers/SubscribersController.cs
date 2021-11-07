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
using FridgeProject.Models.Request;

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
                .Where(x => x.FridgeId == fridgeId && x.User.Email == HttpContext.User.Identity.Name)
                .Select(x => new { x.SubscriberId, x.User.UserId, x.User.Email, x.User.Firstname, x.User.Lastname }).ToListAsync();
        }

        [HttpPost("add")]
        public async Task<ActionResult<Subscriber>> PostSubscriber(SubscriberRequest model)
        {
            var fridge = await _context.Fridges
                .Include(x => x.User)
                .Include(x => x.Subscribers)
                .SingleOrDefaultAsync(x => x.FridgeId == model.FridgeId && x.User.Email == HttpContext.User.Identity.Name);

            if(fridge == null)
            {
                return NotFound();
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            if (fridge.Subscribers.Any(x => x.User.Email == model.Email))
            {
                return BadRequest("User is added");
            }

            var subscriber = new Subscriber { UserId = user.UserId, FridgeId = model.FridgeId };
            _context.Subscribers.Add(subscriber);
            await _context.SaveChangesAsync();

            return Ok(subscriber);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSubscriber(int id)
        {
            var subscriber = await _context.Subscribers
                .Include(x => x.User)
                .Include(x => x.Fridge)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.SubscriberId == id && x.Fridge.User.Email == HttpContext.User.Identity.Name);

            if (subscriber == null)
            {
                return NotFound();
            }

            var products = await _context.Products
                .Where(x => x.FridgeId == subscriber.FridgeId && x.User.Email == subscriber.User.Email)
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
