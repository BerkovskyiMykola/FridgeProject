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

        [HttpGet("all/{fridgeId}")]
        public async Task<IActionResult> GetAddedProducts(int fridgeId)
        {
            var fridge = await _context.Fridges.Include(x => x.User)
                .Include(x => x.Subscribers).ThenInclude(x => x.User)
                .Include(x => x.Products)
                .SingleOrDefaultAsync(x => x.FridgeId == fridgeId);

            if(fridge == null)
            {
                return NotFound();
            }

            if (fridge.Subscribers.Any(x => x.User.Email == HttpContext.User.Identity.Name) || fridge.User.Email == HttpContext.User.Identity.Name)
            {
                var responce = new {
                    fridgeName = fridge.FridgeName,
                    products = fridge.Products
                    .Where(x => x.User.Email == HttpContext.User.Identity.Name && x.isAdded == true)
                    .Select(x => new { x.ProductId, x.ProductName, x.ExpirationDate, x.Description, x.Amount, x.UserId})
                    .ToList()
            };
                return Ok(responce);
            }

            return BadRequest();
        }

        [HttpGet("all/noAdded")]
        public async Task<ActionResult<IEnumerable<Product>>> GetNoAddedProducts()
        {
            return await _context.Products.Where(x => x.User.Email == HttpContext.User.Identity.Name && x.isAdded == false).ToListAsync();
        }

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

        [HttpPut("edit")]
        public async Task<IActionResult> PutProduct(Product model)
        {
            var product = await _context.Products
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.ProductId == model.ProductId && x.User.Email == HttpContext.User.Identity.Name);

            if(product == null)
            {
                return NotFound();
            }

            product.ProductName = model.ProductName;
            product.ExpirationDate = model.ExpirationDate;
            product.Description = model.Description;
            
            if(product.Amount < model.Amount && product.isAdded)
            {
                _context.Histories.Add(new History
                {
                    ProductName = model.ProductName,
                    Date = DateTime.Now,
                    Amount = model.Amount - product.Amount,
                    UserId = product.User.UserId
                });
            }

            product.Amount = model.Amount;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("set/active/{productId}")]
        public async Task<IActionResult> SetAdded(int productId)
        {
            var product = await _context.Products
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.ProductId == productId && x.User.Email == HttpContext.User.Identity.Name && x.isAdded == false);

            if (product == null)
            {
                return NotFound();
            }

            if (product.Amount > 0)
            {
                _context.Histories.Add(new History
                {
                    ProductName = product.ProductName,
                    Date = DateTime.Now,
                    Amount = product.Amount,
                    UserId = product.User.UserId
                });
            }

            product.isAdded = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("throwOut/{productId}/{amount}")]
        public async Task<IActionResult> ThrowOutProduct(int productId, int amount)
        {
            var product = await _context.Products.Include(x => x.User).SingleOrDefaultAsync(x => x.ProductId == productId && x.User.Email == HttpContext.User.Identity.Name);

            if (product == null)
            {
                return NotFound();
            }

            if(product.Amount - amount < 0)
            {
                return BadRequest("you can't throw more than you have");
            }

            _context.Histories.Add(new History
            {
                ProductName = product.ProductName,
                Date = DateTime.Now,
                Amount = -amount,
                UserId = product.User.UserId
            });

            product.Amount = product.Amount - amount;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("create/{isAdded}")]
        public async Task<IActionResult> PostProduct(Product product, bool isAdded)
        {
            var fridge = await _context.Fridges
                .Include(x => x.User)
                .Include(x => x.Subscribers)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.FridgeId == product.FridgeId);

            if(fridge == null)
            {
                return BadRequest("Fridge do not exist");
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            product.isAdded = isAdded;

            if(fridge.Subscribers.Any(x => x.User.Email == HttpContext.User.Identity.Name) || fridge.User.Email == HttpContext.User.Identity.Name)
            {
                product.UserId = user.UserId;
                product.User = user;
                _context.Products.Add(product);

                if (isAdded)
                {
                    _context.Histories.Add(new History
                    {
                        ProductName = product.ProductName,
                        Date = DateTime.Now,
                        Amount = product.Amount,
                        UserId = user.UserId
                    });
                }

                await _context.SaveChangesAsync();
                return Ok(new { product.ProductId, product.ProductName, product.ExpirationDate, product.Description, product.Amount, product.UserId });
            }

            return BadRequest("you can not add in this fridge");
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.Include(x => x.User).SingleOrDefaultAsync(x => x.ProductId == id && x.User.Email == HttpContext.User.Identity.Name);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
