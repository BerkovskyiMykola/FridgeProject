using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FridgeProject.Models
{
    public class Subscriber
    {
        public int SubscriberId { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? FridgeId { get; set; }
        public Fridge Fridge { get; set; }
    }
}
