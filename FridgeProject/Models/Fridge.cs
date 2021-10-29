using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Models
{
    public class Fridge
    {
        public int FridgeId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string FridgeName { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Product> Products { get; set; } = new();
        public List<Subscriber> Subscribers { get; set; } = new();
    }
}
