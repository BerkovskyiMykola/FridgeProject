using System;
using System.ComponentModel.DataAnnotations;

namespace FridgeProject.Anotations
{
    public class CurrentDateAttribute : ValidationAttribute
    {
        public CurrentDateAttribute()
        {
        }

        public override bool IsValid(object value)
        {
            var dt = (DateTime)value;
            if (dt >= DateTime.Today.AddDays(1))
            {
                return true;
            }
            return false;
        }
    }
}
