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
using System.Collections;

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
            var user = new User()
            {
                Lastname = model.Lastname,
                Firstname = model.Firstname,
                Email = model.Email,
                Password = GetPasswordHash(model.Password),
                Role = "User"
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GetToken(new JwtUser { Login = user.Email, Role = user.Role });

            return Ok(new { token, user.UserId, user.Email, user.Role });
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostUser(RegisterRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }
            var user = new User()
            {
                Lastname = model.Lastname,
                Firstname = model.Firstname,
                Email = model.Email,
                Password = GetPasswordHash(model.Password),
                Role = model.Role
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.UserId, user.Firstname, user.Lastname, user.Email, user.Role });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null || user.Password != GetPasswordHash(model.Password))
            {
                return BadRequest("Email or password is incorrect");
            }

            var token = _jwtService.GetToken(new JwtUser { Login = user.Email, Role = user.Role });

            return Ok(new { token, user.UserId, user.Email, user.Role });
        }

        [HttpGet("all")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _context.Users
                .Where(x => x.Email != HttpContext.User.Identity.Name)
                .Select(x => new { x.UserId, x.Firstname, x.Lastname, x.Email, x.Role })
                .ToListAsync());
        }

        [HttpGet("one/{email?}")]
        [Authorize]
        public async Task<IActionResult> GetUser(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == (email != null && HttpContext.User.IsInRole("Admin") ? email : HttpContext.User.Identity.Name));

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { user.Lastname, user.Firstname });
        }

        [HttpPut("edit/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutUser(int id, EditUserRequest model)
        {
            if (id != model.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(model.UserId);

            if (user == null)
            {
                return NotFound();
            }

            user.Lastname = model.Lastname;
            user.Firstname = model.Firstname;
            user.Role = model.Role;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("edit/profile/{id}")]
        [Authorize]
        public async Task<IActionResult> PutUserProfile(int id, ProfileRequest profile)
        {
            if (id != profile.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            user.Lastname = profile.Lastname;
            user.Firstname = profile.Firstname;

            await _context.SaveChangesAsync();

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

        private string GetPasswordHash(string password)
        {
            byte[] hash;
            using (var sha1 = new SHA256CryptoServiceProvider())
                hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);

        }

        [HttpGet("backup")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Backup()
        {
            string dbname = _context.Database.GetDbConnection().Database;
            if (System.IO.File.Exists($"C:\\Backup\\{dbname}.bak"))
            {
                System.IO.File.Delete($"C:\\Backup\\{dbname}.bak");
            }
            string sqlCommand = $"BACKUP DATABASE {dbname} TO DISK = 'C:\\Backup\\{dbname}.bak'";
            await _context.Database.ExecuteSqlRawAsync(sqlCommand);
            return Ok();
        }

        [HttpGet("restore")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Restore()
        {
            string dbname = _context.Database.GetDbConnection().Database;
            string sqlCommand1 = $"USE master RESTORE DATABASE {dbname} FROM DISK = 'C:\\Backup\\{dbname}.bak'";
            await _context.Database.ExecuteSqlRawAsync(sqlCommand1);
            return Ok();
        }
    }
}
