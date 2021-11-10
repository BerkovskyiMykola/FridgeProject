using FridgeProject.Models;
using FridgeProject.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class StatisticsController : ControllerBase
    {
        private readonly DataContext _context;

        public StatisticsController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("products")]
        public IActionResult GetProductStatistic(RangeDateRequset model)
        {
            if (model.StartDate > model.EndDate)
            {
                return BadRequest("Date error");
            }

            var statistic = _context.Histories
                .Where(x => x.User.Email == HttpContext.User.Identity.Name 
                    && x.Date > model.StartDate 
                    && x.Date < model.EndDate)
                .GroupBy(x => x.ProductName)
                .Select(x => new { productName = x.Key, 
                    bought = x.Sum(y => y.Amount > 0 ? y.Amount : 0), 
                    throwOut = x.Sum(y => y.Amount < 0 ? y.Amount : 0) });

            return Ok(statistic);
        }

        [HttpGet("checklist")]
        public async Task<IActionResult> GetCheckList()
        {
            var user = await _context.Users
                .Include(x => x.Histories)
                .Include(x => x.Products)
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            var histories = user.Histories.Where(x =>
                x.Date > DateTime.Today.AddMonths(-2).AddDays(-DateTime.Today.Day)
                && x.Date <= DateTime.Today.AddDays(-DateTime.Today.Day)
                ).ToList();

            if (histories.Count() == 0)
            {
                return BadRequest("History is empty");
            }

            var checkHistory = histories.GroupBy(x => x.Date.Month).Where(x => x.Count() != 0).Select(x => x.Key);

            var checkList = histories
                .Where(x => checkHistory.Contains(x.Date.Month))
                .GroupBy(x => x.ProductName)
                .Select(x => new { 
                    x.Key,
                    Count = 
                        (x.Sum(x => x.Amount)/checkHistory.Count() - Convert.ToInt32(user.Products?.SingleOrDefault(y => y.ProductName == x.Key)?.Amount)) < 0 
                        ? 0 : 
                        x.Sum(x => x.Amount) / checkHistory.Count() - Convert.ToInt32(user.Products?.SingleOrDefault(y => y.ProductName == x.Key)?.Amount)
                }).ToList();

            return Ok(checkList);
        }
    }
}
