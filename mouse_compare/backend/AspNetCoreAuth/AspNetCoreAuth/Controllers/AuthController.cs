using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _config;

    public AuthController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration config)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new AuthResponse { Success = false });

        if (request.Password.Length < 6)
            return BadRequest(new AuthResponse { Success = false });

        var existing = await _userManager.FindByEmailAsync(request.Email);
        if (existing != null)
            return BadRequest(new AuthResponse { Success = false });

        var user = new AppUser
        {
            UserName = request.Email,
            Email = request.Email,
            Avatar = request.Name[..1].ToUpper()
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            return BadRequest(new AuthResponse { Success = false });

        await _userManager.AddToRoleAsync(user, "User");

        var token = GenerateJwtToken(user, "User");

        HttpContext.Response.Cookies.Append("auth-token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return Ok(new AuthResponse
        {
            Success = true,
            User = new UserInfo
            {
                Id = user.Id,
                Name = request.Name,
                Email = user.Email!,
                Role = "user",
                Avatar = user.Avatar ?? "U"
            }
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new AuthResponse { Success = false });

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return Unauthorized(new AuthResponse { Success = false });

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!result.Succeeded)
            return Unauthorized(new AuthResponse { Success = false });

        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault() ?? "User";

        var token = GenerateJwtToken(user, role);

        HttpContext.Response.Cookies.Append("auth-token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return Ok(new AuthResponse
        {
            Success = true,
            User = new UserInfo
            {
                Id = user.Id,
                Name = user.UserName ?? user.Email!,
                Email = user.Email!,
                Role = role.ToLower(),
                Avatar = user.Avatar ?? "U"
            }
        });
    }

    [HttpGet("me")]
    public async Task<ActionResult<AuthResponse>> Me()
    {
        var token = HttpContext.Request.Cookies["auth-token"];
        if (string.IsNullOrEmpty(token))
            return Unauthorized(new AuthResponse { Success = false });

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);
            var validation = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _config["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _config["Jwt:Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            var principal = handler.ValidateToken(token, validation, out _);
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = principal.FindFirst(ClaimTypes.Email)?.Value;
            var role = principal.FindFirst(ClaimTypes.Role)?.Value ?? "user";
            var name = principal.FindFirst("name")?.Value ?? email;

            return Ok(new AuthResponse
            {
                Success = true,
                User = new UserInfo
                {
                    Id = userId ?? "",
                    Name = name ?? "",
                    Email = email ?? "",
                    Role = role,
                    Avatar = "U"
                }
            });
        }
        catch
        {
            return Unauthorized(new AuthResponse { Success = false });
        }
    }

    [HttpDelete("me")]
    public ActionResult Logout()
    {
        HttpContext.Response.Cookies.Append("auth-token", "", new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddDays(-1)
        });

        return Ok(new { message = "Logged out successfully" });
    }

    private string GenerateJwtToken(AppUser user, string role)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email ?? ""),
            new Claim(ClaimTypes.Role, role),
            new Claim("name", user.UserName ?? user.Email ?? "")
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
