using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAuth.Models;

public class SubmitMouseRequest
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name must be at most 100 characters")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Brand is required")]
    [StringLength(100, ErrorMessage = "Brand must be at most 100 characters")]
    public string Brand { get; set; } = string.Empty;

    [Url(ErrorMessage = "Invalid link URL")]
    public string? Link { get; set; }
}

public class CreateReviewRequest
{
    [Required(ErrorMessage = "Mouse is required")]
    [StringLength(100, ErrorMessage = "Mouse id must be at most 100 characters")]
    public string MouseId { get; set; } = string.Empty;

    [StringLength(100, ErrorMessage = "Mouse name must be at most 100 characters")]
    public string MouseName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Review text is required")]
    [StringLength(5000, ErrorMessage = "Review must be at most 5000 characters")]
    public string Text { get; set; } = string.Empty;

    [Range(1, 10, ErrorMessage = "Rating must be between 1 and 10")]
    public int Rating { get; set; }
}

public class UpdateReviewRequest
{
    [Required(ErrorMessage = "Review text is required")]
    [StringLength(5000, ErrorMessage = "Review must be at most 5000 characters")]
    public string Text { get; set; } = string.Empty;

    [Range(1, 10, ErrorMessage = "Rating must be between 1 and 10")]
    public int Rating { get; set; }
}
