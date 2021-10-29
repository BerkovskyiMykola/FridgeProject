﻿using FridgeProject.Anotations;
using System;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string ProductName { get; set; }
        [Required]
        [CurrentDate(ErrorMessage = "Date must be after or equal to current date")]
        public DateTime ExpirationDate { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 2)]
        public string Description { get; set; }
        [Range(1, int.MaxValue)]
        public int Amount { get; set; }
        public bool isAdded { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }
        public int FridgeId { get; set; }
        public Fridge Fridge { get; set; }
    }
}
