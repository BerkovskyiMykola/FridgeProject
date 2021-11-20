using FridgeProject.Hubs;
using FridgeProject.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FridgeProject.WorkerServices
{
    public class NotificationWorker : BackgroundService
    {
        private readonly IHubContext<NotificationHub> _hub;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly TimeSpan interval = new(24, 0, 0);

        public NotificationWorker(IHubContext<NotificationHub> hub, IServiceScopeFactory scopeFactory)
        {
            _hub = hub;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var _scope = _scopeFactory.CreateScope())
                {
                    var _applicationContext = _scope.ServiceProvider.GetRequiredService<DataContext>();

                    var products = _applicationContext.Products
                        .Include(x => x.Fridge)
                        .Include(x => x.User).ThenInclude(x => x.Notifications)
                        .Where(x => x.ExpirationDate.Date >= DateTime.Now.Date);
                    foreach (var product in products)
                    {
                        var countDaysUntilExpiration = product.ExpirationDate.Date.Subtract(DateTime.Now.Date).Days;

                        switch (countDaysUntilExpiration)
                        {
                            case 0:
                                {
                                    var notification = new Notification
                                    {
                                        FridgeName = product.Fridge.FridgeName,
                                        ProductName = product.ProductName,
                                        IsExpired = true,
                                        Date = DateTime.Now
                                    };
                                    await _hub.Clients.User(product.User.Email).SendAsync("Notify", notification, stoppingToken);
                                    product.User.Notifications.Add(notification);

                                    break;
                                }
                            case 1:
                                {
                                    var notification = new Notification
                                    {
                                        FridgeName = product.Fridge.FridgeName,
                                        ProductName = product.ProductName,
                                        IsExpired = false,
                                        Date = DateTime.Now
                                    };
                                    await _hub.Clients.User(product.User.Email).SendAsync("Notify", notification, stoppingToken);
                                    product.User.Notifications.Add(notification);

                                    break;
                                }
                        }
                    }
                    await _applicationContext.SaveChangesAsync(stoppingToken);
                }
                await Task.Delay(interval, stoppingToken);
            }
        }
    }
}
