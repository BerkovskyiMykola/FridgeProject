using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; }
        [Required]
        [EmailAddress]
        public string Email { set; get; }
        [Required]
        [StringLength(16, MinimumLength = 8)]
        public string Password { set; get; }
        [Required]
        public string Role { set; get; }
        public List<Notification> Notifications { get; set; } = new();
        public List<History> Histories { get; set; } = new();
        public List<Fridge> Fridges { get; set; } = new();
        public List<Product> Products { get; set; } = new();
        public List<Subscriber> Subscribers { get; set; } = new();
    }
}
