using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreAuth.Models;
using AspNetCoreAuth.Services;

namespace AspNetCoreAuth.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet]
    public IActionResult List([FromQuery] string? mouseId, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        var (items, total) = _reviewService.GetAll(mouseId, page, pageSize);
        return Ok(new { reviews = items, total, page, pageSize });
    }

    [HttpGet("mine")]
    [Authorize]
    public IActionResult Mine([FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
        var (items, total) = _reviewService.GetMine(userId, page, pageSize);
        return Ok(new { reviews = items, total, page, pageSize });
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] CreateReviewRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.MouseId) ||
            string.IsNullOrWhiteSpace(request.Text) ||
            request.Rating < 1 || request.Rating > 10)
            return BadRequest(new { error = "Missing required fields" });

        var review = _reviewService.Create(new Review
        {
            UserId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "",
            UserName = User.FindFirst("name")?.Value ?? "User",
            MouseId = request.MouseId.Trim(),
            MouseName = string.IsNullOrWhiteSpace(request.MouseName) ? request.MouseId.Trim() : request.MouseName.Trim(),
            Text = request.Text.Trim(),
            Rating = request.Rating
        });

        return Created($"/api/reviews/{review.Id}", new { review });
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public IActionResult Update(int id, [FromBody] UpdateReviewRequest request)
    {
        var review = _reviewService.Find(id);
        if (review is null)
            return NotFound(new { error = "Review not found" });

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
        if (review.UserId != userId && !User.IsInRole("Admin"))
            return Forbid();

        if (string.IsNullOrWhiteSpace(request.Text) ||
            request.Rating < 1 || request.Rating > 10)
            return BadRequest(new { error = "Missing required fields" });

        review.Text = request.Text.Trim();
        review.Rating = request.Rating;
        _reviewService.Update(review);

        return Ok(new { message = "Review updated", review });
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        var review = _reviewService.Find(id);
        if (review is null)
            return NotFound(new { error = "Review not found" });

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
        if (review.UserId != userId && !User.IsInRole("Admin"))
            return Forbid();

        _reviewService.Delete(id);
        return Ok(new { message = "Review deleted" });
    }
}
