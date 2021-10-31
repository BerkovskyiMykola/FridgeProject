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
        [HttpGet("all/{fridgeId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int fridgeId)
        {
            return await _context.Products.Where(x => x.FridgeId == fridgeId && x.User.Email == HttpContext.User.Identity.Name).ToListAsync();
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

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        //OK
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.SingleOrDefaultAsync(x => x.ProductId == id && x.User.Email == HttpContext.User.Identity.Name);
            if (product == null)
            {
                return NotFound();
            }

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
