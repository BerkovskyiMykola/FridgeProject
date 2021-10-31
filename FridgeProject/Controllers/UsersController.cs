using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeProject.Models;
using FridgeProject.Services.Authorization;
using System.Security.Cryptography;
using System.Text;
using FridgeProject.Services.Authorization.Models;
using Microsoft.AspNetCore.Authorization;
using FridgeProject.Models.Request;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IJwtService _jwtService;

        public UsersController(DataContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }

            await _context.Users.AddAsync(new User() { 
                Lastname = model.Lastname,
                Firstname = model.Firstname,
                Email = model.Email,
                Password = GetPasswordHash(model.Password),
                Role = model.Role
            });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
            {
                return BadRequest("User with such Email don`t exist");
            }

            if (user.Password != GetPasswordHash(model.Password))
            {
                return BadRequest("Invalid password");
            }

            var token = _jwtService.GetToken(new JwtUser { Login = user.Email, Role = user.Role });

            return Ok(new { token, user.UserId, user.Email });
        }

        [HttpGet("all")]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("one/{email?}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == (email != null && HttpContext.User.IsInRole("Admin") ? email : HttpContext.User.Identity.Name));

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("edit/{id}")]
        [Authorize]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;
            _context.Entry(user).Property(x => x.Email).IsModified = false;
            _context.Entry(user).Property(x => x.Password).IsModified = false;
            var lists = _context.Entry(user).Collections.Where(x => x.GetType().Name == "List`1");
            foreach (var list in lists)
            {
                list.IsModified = false;
            }
            if (HttpContext.User.IsInRole("User"))
            {
                _context.Entry(user).Property(x => x.Role).IsModified = false;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.Include(x => x.Products).Include(x => x.Subscribers).SingleOrDefaultAsync(x => x.UserId == id);
            if (user == null)
            {
                return NotFound();
            }

            foreach(var product in user.Products)
            {
                _context.Products.Remove(product);
            }

            foreach (var subscriber in user.Subscribers)
            {
                _context.Subscribers.Remove(subscriber);
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        private string GetPasswordHash(string password)
        {
            byte[] hash;
            using (var sha1 = new SHA1CryptoServiceProvider())
                hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);

        }
    }
}
