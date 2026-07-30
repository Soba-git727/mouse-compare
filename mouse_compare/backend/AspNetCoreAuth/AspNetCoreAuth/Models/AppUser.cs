using Microsoft.AspNetCore.Identity;

namespace AspNetCoreAuth.Models;

public class AppUser : IdentityUser
{
    public string? Avatar { get; set; }
}
