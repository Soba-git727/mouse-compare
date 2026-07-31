using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAuth.Models;

public class MouseDto
{
    public string id { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string brand { get; set; } = string.Empty;
    public double price { get; set; }
    public int weight { get; set; }
    public string dimensions { get; set; } = string.Empty;
    public double length_mm { get; set; }
    public double width_mm { get; set; }
    public double height_mm { get; set; }
    public string sensor { get; set; } = string.Empty;
    public string sensor_desc { get; set; } = string.Empty;
    public string connection { get; set; } = string.Empty;
    public int battery { get; set; }
    public string switches { get; set; } = string.Empty;
    public string switches_desc { get; set; } = string.Empty;
    public int dpi { get; set; }
    public int ips { get; set; }
    public int acceleration { get; set; }
    public int buttons { get; set; }
    public bool ergonomic { get; set; }
    public string coating { get; set; } = string.Empty;
    public int hand_size_min { get; set; }
    public int hand_size_max { get; set; }
    public string[] grip_styles { get; set; } = [];
    public ShapeSvg? shape_svg { get; set; }
    public MouseImages? images { get; set; }
    public string photo { get; set; } = string.Empty;
    public string[] colors { get; set; } = [];
    public double rating { get; set; }
    public int review_count { get; set; }
}

public class MouseRequest
{
    public string? id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name must be at most 100 characters")]
    public string name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Brand is required")]
    [StringLength(100, ErrorMessage = "Brand must be at most 100 characters")]
    public string brand { get; set; } = string.Empty;
    public double price { get; set; }
    public int weight { get; set; }
    public string dimensions { get; set; } = string.Empty;
    public double length_mm { get; set; }
    public double width_mm { get; set; }
    public double height_mm { get; set; }
    public string sensor { get; set; } = string.Empty;
    public string sensor_desc { get; set; } = string.Empty;
    public string connection { get; set; } = string.Empty;
    public int battery { get; set; }
    public string switches { get; set; } = string.Empty;
    public string switches_desc { get; set; } = string.Empty;
    public int dpi { get; set; }
    public int ips { get; set; }
    public int acceleration { get; set; }
    public int buttons { get; set; }
    public bool ergonomic { get; set; }
    public string coating { get; set; } = string.Empty;
    public int hand_size_min { get; set; }
    public int hand_size_max { get; set; }
    public string[] grip_styles { get; set; } = [];
    public ShapeSvg? shape_svg { get; set; }
    public MouseImages? images { get; set; }
    public string photo { get; set; } = string.Empty;
    public string[] colors { get; set; } = [];
    public double rating { get; set; }
    public int review_count { get; set; }
}
