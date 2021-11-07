using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FridgeProject.Models.Request
{
    public class SubscriberRequest
    {
        [Required]
        [EmailAddress]
        public string Email { set; get; }

        public int FridgeId { get; set; }
    }
}
