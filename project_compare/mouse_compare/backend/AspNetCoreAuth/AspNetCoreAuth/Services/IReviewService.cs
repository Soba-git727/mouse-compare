using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Services;

public interface IReviewService
{
    (List<Review> Items, int Total) GetAll(string? mouseId = null, int page = 1, int pageSize = 50);
    (List<Review> Items, int Total) GetMine(string userId, int page = 1, int pageSize = 50);
    Review? Find(int id);
    Review Create(Review review);
    bool Update(Review review);
    bool Delete(int id);
}
