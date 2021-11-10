using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User,Admin")]
    public class HistoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public HistoriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<History>>> GetHistories()
        {
            return await _context.Histories.Where(x => x.User.Email == HttpContext.User.Identity.Name).OrderByDescending(x => x.Date).ToListAsync();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteHistory(int id)
        {
            var history = await _context.Histories.SingleOrDefaultAsync(x => x.HistoryId == id && x.User.Email == HttpContext.User.Identity.Name);
            if (history == null)
            {
                return NotFound();
            }

            _context.Histories.Remove(history);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
