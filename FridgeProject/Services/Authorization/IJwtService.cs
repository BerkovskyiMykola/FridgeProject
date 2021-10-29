using FridgeProject.Services.Authorization.Models;

namespace FridgeProject.Services.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
