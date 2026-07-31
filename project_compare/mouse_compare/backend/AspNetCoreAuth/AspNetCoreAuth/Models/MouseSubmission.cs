using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAuth.Models;

public class MouseSubmission
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Brand { get; set; } = string.Empty;

    public string? Link { get; set; }

    public string? SubmittedBy { get; set; }

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}
