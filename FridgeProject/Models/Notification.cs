using System;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string ProductName { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string FridgeName { set; get; }
        public bool IsExpired { get; set; }
        [Required]
        public DateTime Date { set; get; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
