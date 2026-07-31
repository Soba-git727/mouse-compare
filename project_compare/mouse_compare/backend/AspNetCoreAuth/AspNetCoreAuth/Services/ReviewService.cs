using AspNetCoreAuth.Data;
using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Services;

public class ReviewService : IReviewService
{
    private readonly AppDbContext _db;

    public ReviewService(AppDbContext db)
    {
        _db = db;
    }

    public (List<Review> Items, int Total) GetAll(string? mouseId = null, int page = 1, int pageSize = 50)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);
        var query = _db.Reviews.AsQueryable();
        if (!string.IsNullOrWhiteSpace(mouseId))
            query = query.Where(r => r.MouseId == mouseId.Trim());
        var total = query.Count();
        var items = query
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return (items, total);
    }

    public (List<Review> Items, int Total) GetMine(string userId, int page = 1, int pageSize = 50)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);
        var query = _db.Reviews.Where(r => r.UserId == userId);
        var total = query.Count();
        var items = query
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return (items, total);
    }

    public Review? Find(int id)
    {
        return _db.Reviews.Find(id);
    }

    public Review Create(Review review)
    {
        _db.Reviews.Add(review);
        _db.SaveChanges();
        return review;
    }

    public bool Update(Review review)
    {
        var existing = _db.Reviews.Find(review.Id);
        if (existing is null) return false;
        existing.Text = review.Text;
        existing.Rating = review.Rating;
        _db.SaveChanges();
        return true;
    }

    public bool Delete(int id)
    {
        var review = _db.Reviews.Find(id);
        if (review is null) return false;
        _db.Reviews.Remove(review);
        _db.SaveChanges();
        return true;
    }
}
