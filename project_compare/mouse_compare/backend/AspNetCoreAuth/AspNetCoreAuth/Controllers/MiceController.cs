using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreAuth.Mappings;
using AspNetCoreAuth.Models;
using AspNetCoreAuth.Services;

namespace AspNetCoreAuth.Controllers;

[ApiController]
[Route("api/mice")]
public class MiceController : ControllerBase
{
    private readonly IMouseService _mouseService;
    private readonly IMouseSubmissionService _submissionService;

    public MiceController(IMouseService mouseService, IMouseSubmissionService submissionService)
    {
        _mouseService = mouseService;
        _submissionService = submissionService;
    }

    [HttpGet]
    public IActionResult List([FromQuery] int page = 1, [FromQuery] int pageSize = 100)
    {
        var (items, total) = _mouseService.GetAll(page, pageSize);
        return Ok(new
        {
            mice = items.Select(MouseMapper.ToDto),
            total,
            page,
            pageSize
        });
    }

    [HttpGet("{id}")]
    public IActionResult Detail(string id)
    {
        var mouse = _mouseService.GetById(id);
        if (mouse is null)
            return NotFound(new { error = "Mouse not found" });
        return Ok(new { mouse = MouseMapper.ToDto(mouse) });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult Create([FromBody] MouseRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.name) || string.IsNullOrWhiteSpace(request.brand))
            return BadRequest(new { error = "Name and brand are required" });

        var entity = MouseMapper.ToEntity(request);
        if (string.IsNullOrWhiteSpace(entity.Id))
            entity.Id = _mouseService.MakeUniqueId(MouseService.MakeSlug(request.name, request.brand));
        else
            entity.Id = _mouseService.MakeUniqueId(entity.Id);

        var created = _mouseService.Create(entity);
        return Created($"/api/mice/{created.Id}", new { message = "Mouse created", mouse = MouseMapper.ToDto(created) });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update(string id, [FromBody] MouseRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.name) || string.IsNullOrWhiteSpace(request.brand))
            return BadRequest(new { error = "Name and brand are required" });

        var updated = _mouseService.Update(id, MouseMapper.ToEntity(request, id));
        if (updated is null)
            return NotFound(new { error = "Mouse not found" });

        return Ok(new { message = "Mouse updated", mouse = MouseMapper.ToDto(updated) });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete(string id)
    {
        var deleted = _mouseService.Delete(id);
        if (!deleted)
            return NotFound(new { error = "Mouse not found" });

        return Ok(new { message = "Mouse deleted" });
    }

    [HttpGet("pending")]
    public IActionResult ListPending()
    {
        return Ok(new { pending = _submissionService.GetPending() });
    }

    [HttpPost("pending")]
    [Authorize]
    public IActionResult Submit([FromBody] SubmitMouseRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Brand))
            return BadRequest(new { error = "Name and brand required" });

        var entry = _submissionService.Submit(new MouseSubmission
        {
            Name = request.Name.Trim(),
            Brand = request.Brand.Trim(),
            Link = string.IsNullOrWhiteSpace(request.Link) ? null : request.Link.Trim(),
            SubmittedBy = User.FindFirst("name")?.Value ?? "Unknown"
        });

        return Created($"/api/mice/pending/{entry.Id}", new { message = "Mouse submitted for review", entry });
    }
}
