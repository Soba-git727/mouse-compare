using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAuth.Controllers;

[ApiController]
[Route("api/upload")]
public class UploadController : ControllerBase
{
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
    private const long MaxFileSize = 5 * 1024 * 1024;

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { error = "No file uploaded" });
        if (file.Length > MaxFileSize)
            return BadRequest(new { error = "File too large (max 5MB)" });

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (string.IsNullOrEmpty(ext) || !AllowedExtensions.Contains(ext))
            return BadRequest(new { error = "Only JPG, PNG, GIF, WEBP files are allowed" });

        var photosDir = Path.Combine(GetProjectRoot(), "public", "assets", "mice", "photos");
        Directory.CreateDirectory(photosDir);

        var fileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(photosDir, fileName);

        await using (var stream = System.IO.File.Create(fullPath))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new { url = $"/assets/mice/photos/{fileName}" });
    }

    private static string GetProjectRoot()
    {
        var contentRoot = Directory.GetCurrentDirectory();
        var dir = new DirectoryInfo(contentRoot);
        while (dir is not null && !Directory.Exists(Path.Combine(dir.FullName, "public")))
        {
            dir = dir.Parent;
        }
        return dir?.FullName ?? contentRoot;
    }
}
