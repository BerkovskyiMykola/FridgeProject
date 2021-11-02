using FridgeProject.Models;
using FridgeProject.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly DataContext _context;

        public StatisticsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("products")]
        public IActionResult GetProductStatistic(RangeDateRequset model)
        {
            if (model.StartDate > model.EndDate)
            {
                return BadRequest("Date error");
            }

            var statistic = _context.Histories
                .Where(x => x.User.Email == HttpContext.User.Identity.Name)
                .GroupBy(x => x.ProductName)
                .Select(x => new { x.Key, bought = x.Sum(y => y.Amount > 0 ? y.Amount : 0), throwOut = x.Sum(y => y.Amount < 0 ? y.Amount : 0) });

            return Ok(statistic);
        }
    }
}
