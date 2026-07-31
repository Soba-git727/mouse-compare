using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAuth.Models;

public class Review
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    public string MouseId { get; set; } = string.Empty;

    public string MouseName { get; set; } = string.Empty;

    [Required]
    public string Text { get; set; } = string.Empty;

    [Range(1, 10)]
    public int Rating { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
