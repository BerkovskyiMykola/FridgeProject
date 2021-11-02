using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FridgeProject.Models.Request
{
    public class NotificationRequest
    {
        public int NotificationId { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 2)]
        public string Text { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
