using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAuth.Models;

public class Mouse
{
    [Key]
    [MaxLength(100)]
    public string Id { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Brand { get; set; } = string.Empty;

    public double Price { get; set; }

    public int Weight { get; set; }

    public string Dimensions { get; set; } = string.Empty;

    public double LengthMm { get; set; }

    public double WidthMm { get; set; }

    public double HeightMm { get; set; }

    public string Sensor { get; set; } = string.Empty;

    public string SensorDesc { get; set; } = string.Empty;

    public string Connection { get; set; } = string.Empty;

    public int Battery { get; set; }

    public string Switches { get; set; } = string.Empty;

    public string SwitchesDesc { get; set; } = string.Empty;

    public int Dpi { get; set; }

    public int Ips { get; set; }

    public int Acceleration { get; set; }

    public int Buttons { get; set; }

    public bool Ergonomic { get; set; }

    public string Coating { get; set; } = string.Empty;

    public int HandSizeMin { get; set; }

    public int HandSizeMax { get; set; }

    public string[] GripStyles { get; set; } = [];

    public ShapeSvg? ShapeSvg { get; set; }

    public MouseImages? Images { get; set; }

    public string Photo { get; set; } = string.Empty;

    public string[] Colors { get; set; } = [];

    public double Rating { get; set; }

    public int ReviewCount { get; set; }
}

public class ShapeSvg
{
    public string Top { get; set; } = string.Empty;
    public string Side { get; set; } = string.Empty;
    public string Back { get; set; } = string.Empty;
}

public class MouseImages
{
    public string Top { get; set; } = string.Empty;
    public string Side { get; set; } = string.Empty;
}
