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
        public async Task<IActionResult> GetSubscribers(int fridgeId)
        {
            var fridge = await _context.Fridges
                .Include(x => x.Subscribers).ThenInclude(x => x.User)
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.FridgeId == fridgeId && x.User.Email == HttpContext.User.Identity.Name);
            if(fridge == null)
            {
                return NotFound();
            }

            var responce = new {
                fridgeName = fridge.FridgeName,
                subscribers = fridge.Subscribers
                .Select(x => new { x.SubscriberId, x.User.UserId, x.User.Email, x.User.Firstname, x.User.Lastname }).ToList()
            };

            return Ok(responce);
        }

        [HttpPost("add")]
        public async Task<IActionResult> PostSubscriber(SubscriberRequest model)
        {
            if(model.Email == HttpContext.User.Identity.Name)
            {
                return BadRequest();
            }
            var fridge = await _context.Fridges
                .Include(x => x.User)
                .Include(x => x.Subscribers).ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.FridgeId == model.FridgeId && x.User.Email == HttpContext.User.Identity.Name);

            if(fridge == null)
            {
                return NotFound();
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == model.Email);

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

            return Ok(new { subscriber.SubscriberId, subscriber.User.UserId, subscriber.User.Email, subscriber.User.Firstname, subscriber.User.Lastname });
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
