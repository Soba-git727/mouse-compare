using System.Text.Json;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Mouse> Mice => Set<Mouse>();

    public DbSet<MouseSubmission> MouseSubmissions => Set<MouseSubmission>();

    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var jsonOptions = new JsonSerializerOptions(JsonSerializerDefaults.General);

        modelBuilder.Entity<Mouse>(entity =>
        {
            entity.Property(m => m.ShapeSvg)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, jsonOptions),
                    v => JsonSerializer.Deserialize<ShapeSvg>(v, jsonOptions) ?? new ShapeSvg());

            entity.Property(m => m.Images)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, jsonOptions),
                    v => JsonSerializer.Deserialize<MouseImages>(v, jsonOptions) ?? new MouseImages());
        });
    }
}
