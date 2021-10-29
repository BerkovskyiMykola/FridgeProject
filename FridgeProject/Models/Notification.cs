using System;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 2)]
        public string Text { set; get; }
        [Required]
        public DateTime Date { set; get; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
