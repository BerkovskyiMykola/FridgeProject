using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using FridgeProject.Hubs;
using FridgeProject.Models.Request;

namespace FridgeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHubContext<NotificationHub> _hub;

        public NotificationsController(DataContext context, IHubContext<NotificationHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            return await _context.Notifications.Where(u => u.User.Email == HttpContext.User.Identity.Name).OrderByDescending(x => x.Date).ToListAsync();
        }

        [HttpPost("send")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateNotification(NotificationRequest request)
        {
            await _hub.Clients.All.SendAsync("Notify", request);

            var users = _context.Users.Include(u => u.Notifications);

            var notification = new Notification
            {
                Text = request.Text,
                Date = request.Date
            };

            foreach (var user in users)
            {
                user.Notifications.Add(notification);

            }
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
