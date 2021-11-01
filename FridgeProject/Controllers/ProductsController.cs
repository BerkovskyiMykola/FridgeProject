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
    [Authorize(Roles = "Admin,User")]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }

        //OK
        [HttpGet("all/{added}/{fridgeId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int fridgeId, bool added)
        {
            return await _context.Products.Where(x => x.FridgeId == fridgeId && x.User.Email == HttpContext.User.Identity.Name && x.isAdded == added).ToListAsync();
        }

        //ОК
        [HttpGet("one/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.SingleOrDefaultAsync(x => x.ProductId == id && x.User.Email == HttpContext.User.Identity.Name);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProduct(int id, Product product)
        //{
        //    if (id != product.ProductId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(product).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //OK
        [HttpPost("create/{isAdded}")]
        public async Task<ActionResult<Product>> PostProduct(Product product, bool isAdded)
        {
            var fridge = await _context.Fridges
                .Include(x => x.User)
                .Include(x => x.Subscribers)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.FridgeId == product.FridgeId);

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            product.isAdded = isAdded;

            if(fridge.Subscribers.Any(x => x.User.Email == HttpContext.User.Identity.Name) || fridge.User.Email == HttpContext.User.Identity.Name)
            {
                product.UserId = user.UserId;
                product.User = user;
                _context.Products.Add(product);

                _context.Histories.Add(new History
                {
                    ProductName = product.ProductName,
                    Date = DateTime.Now,
                    Amount = product.Amount,
                    UserId = user.UserId
                });

                await _context.SaveChangesAsync();
                return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
            }

            return BadRequest();
        }

        //+-
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.Include(x => x.User).SingleOrDefaultAsync(x => x.ProductId == id && x.User.Email == HttpContext.User.Identity.Name);
            if (product == null)
            {
                return NotFound();
            }

            _context.Histories.Add(new History
            {
                ProductName = product.ProductName,
                Date = DateTime.Now,
                Amount = -product.Amount,
                UserId = product.User.UserId
            });

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
