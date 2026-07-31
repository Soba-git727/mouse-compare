using AspNetCoreAuth.Data;
using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Services;

public interface IMouseSubmissionService
{
    List<MouseSubmission> GetPending();
    MouseSubmission Submit(MouseSubmission submission);
}

public class MouseSubmissionService : IMouseSubmissionService
{
    private readonly AppDbContext _db;

    public MouseSubmissionService(AppDbContext db)
    {
        _db = db;
    }

    public List<MouseSubmission> GetPending()
    {
        return _db.MouseSubmissions.OrderByDescending(m => m.SubmittedAt).ToList();
    }

    public MouseSubmission Submit(MouseSubmission submission)
    {
        _db.MouseSubmissions.Add(submission);
        _db.SaveChanges();
        return submission;
    }
}
