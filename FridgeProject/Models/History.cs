using System;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Models
{
    public class History
    {
        public int HistoryId { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public int ProductName { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public int Amount { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
