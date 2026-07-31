using System.Text;
using Microsoft.EntityFrameworkCore;
using AspNetCoreAuth.Data;
using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Services;

public interface IMouseService
{
    (List<Mouse> Items, int Total) GetAll(int page = 1, int pageSize = 100);
    Mouse? GetById(string id);
    Mouse Create(Mouse mouse);
    Mouse? Update(string id, Mouse updated);
    bool Delete(string id);
    string MakeUniqueId(string baseId);
    int Seed(IEnumerable<Mouse> mice);
}

public class MouseService : IMouseService
{
    private readonly AppDbContext _db;

    public MouseService(AppDbContext db)
    {
        _db = db;
    }

    public (List<Mouse> Items, int Total) GetAll(int page = 1, int pageSize = 100)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);
        var query = _db.Mice.OrderBy(m => m.Name);
        var total = query.Count();
        var items = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return (items, total);
    }

    public Mouse? GetById(string id)
    {
        return _db.Mice.Find(id);
    }

    public Mouse Create(Mouse mouse)
    {
        _db.Mice.Add(mouse);
        _db.SaveChanges();
        return mouse;
    }

    public Mouse? Update(string id, Mouse updated)
    {
        var existing = _db.Mice.Find(id);
        if (existing is null) return null;

        existing.Name = updated.Name;
        existing.Brand = updated.Brand;
        existing.Price = updated.Price;
        existing.Weight = updated.Weight;
        existing.Dimensions = updated.Dimensions;
        existing.LengthMm = updated.LengthMm;
        existing.WidthMm = updated.WidthMm;
        existing.HeightMm = updated.HeightMm;
        existing.Sensor = updated.Sensor;
        existing.SensorDesc = updated.SensorDesc;
        existing.Connection = updated.Connection;
        existing.Battery = updated.Battery;
        existing.Switches = updated.Switches;
        existing.SwitchesDesc = updated.SwitchesDesc;
        existing.Dpi = updated.Dpi;
        existing.Ips = updated.Ips;
        existing.Acceleration = updated.Acceleration;
        existing.Buttons = updated.Buttons;
        existing.Ergonomic = updated.Ergonomic;
        existing.Coating = updated.Coating;
        existing.HandSizeMin = updated.HandSizeMin;
        existing.HandSizeMax = updated.HandSizeMax;
        existing.GripStyles = updated.GripStyles;
        existing.ShapeSvg = updated.ShapeSvg;
        existing.Images = updated.Images;
        existing.Photo = updated.Photo;
        existing.Colors = updated.Colors;
        existing.Rating = updated.Rating;
        existing.ReviewCount = updated.ReviewCount;

        _db.SaveChanges();
        return existing;
    }

    public bool Delete(string id)
    {
        var existing = _db.Mice.Find(id);
        if (existing is null) return false;
        _db.Mice.Remove(existing);
        _db.SaveChanges();
        return true;
    }

    public string MakeUniqueId(string baseId)
    {
        if (string.IsNullOrWhiteSpace(baseId))
            baseId = "mouse";
        var candidate = baseId;
        var suffix = 2;
        while (_db.Mice.Any(m => m.Id == candidate))
        {
            candidate = $"{baseId}-{suffix}";
            suffix++;
        }
        return candidate;
    }

    public static string MakeSlug(string name, string brand)
    {
        var s = $"{brand} {name}".ToLowerInvariant();
        var sb = new StringBuilder();
        foreach (var c in s)
            sb.Append(char.IsLetterOrDigit(c) ? c : '-');
        var slug = sb.ToString();
        while (slug.Contains("--")) slug = slug.Replace("--", "-");
        return slug.Trim('-');
    }

    public int Seed(IEnumerable<Mouse> mice)
    {
        var changed = 0;
        foreach (var mouse in mice)
        {
            var existing = _db.Mice.FirstOrDefault(m => m.Id == mouse.Id);
            if (existing is null)
            {
                _db.Mice.Add(mouse);
                changed++;
            }
            else if (FillMissing(existing, mouse))
            {
                _db.Entry(existing).State = EntityState.Modified;
                changed++;
            }
        }
        if (changed > 0) _db.SaveChanges();
        return changed;
    }

    private static bool IsEmpty(object? value) => value switch
    {
        null => true,
        string s => string.IsNullOrWhiteSpace(s),
        int i => i == 0,
        double d => d == 0,
        ShapeSvg svg => string.IsNullOrWhiteSpace(svg.Top) && string.IsNullOrWhiteSpace(svg.Side) && string.IsNullOrWhiteSpace(svg.Back),
        MouseImages img => string.IsNullOrWhiteSpace(img.Top) && string.IsNullOrWhiteSpace(img.Side),
        System.Collections.IEnumerable e => !e.Cast<object?>().Any(),
        _ => false
    };

    private static bool FillMissing(Mouse existing, Mouse seed)
    {
        var changed = false;
        foreach (var prop in typeof(Mouse).GetProperties())
        {
            if (prop.Name == nameof(Mouse.Id)) continue;
            if (!IsEmpty(prop.GetValue(existing))) continue;
            var seedValue = prop.GetValue(seed);
            if (IsEmpty(seedValue)) continue;
            prop.SetValue(existing, seedValue);
            changed = true;
        }
        return changed;
    }
}
