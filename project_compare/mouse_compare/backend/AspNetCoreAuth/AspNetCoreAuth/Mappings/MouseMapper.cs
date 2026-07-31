using AspNetCoreAuth.Models;

namespace AspNetCoreAuth.Mappings;

public static class MouseMapper
{
    public static MouseDto ToDto(Mouse m) => new()
    {
        id = m.Id,
        name = m.Name,
        brand = m.Brand,
        price = m.Price,
        weight = m.Weight,
        dimensions = m.Dimensions,
        length_mm = m.LengthMm,
        width_mm = m.WidthMm,
        height_mm = m.HeightMm,
        sensor = m.Sensor,
        sensor_desc = m.SensorDesc,
        connection = m.Connection,
        battery = m.Battery,
        switches = m.Switches,
        switches_desc = m.SwitchesDesc,
        dpi = m.Dpi,
        ips = m.Ips,
        acceleration = m.Acceleration,
        buttons = m.Buttons,
        ergonomic = m.Ergonomic,
        coating = m.Coating,
        hand_size_min = m.HandSizeMin,
        hand_size_max = m.HandSizeMax,
        grip_styles = m.GripStyles,
        shape_svg = m.ShapeSvg,
        images = m.Images,
        photo = m.Photo,
        colors = m.Colors,
        rating = m.Rating,
        review_count = m.ReviewCount
    };

    public static Mouse ToEntity(MouseRequest r, string? id = null) => new()
    {
        Id = id ?? r.id ?? string.Empty,
        Name = r.name,
        Brand = r.brand,
        Price = r.price,
        Weight = r.weight,
        Dimensions = r.dimensions,
        LengthMm = r.length_mm,
        WidthMm = r.width_mm,
        HeightMm = r.height_mm,
        Sensor = r.sensor,
        SensorDesc = r.sensor_desc,
        Connection = r.connection,
        Battery = r.battery,
        Switches = r.switches,
        SwitchesDesc = r.switches_desc,
        Dpi = r.dpi,
        Ips = r.ips,
        Acceleration = r.acceleration,
        Buttons = r.buttons,
        Ergonomic = r.ergonomic,
        Coating = r.coating,
        HandSizeMin = r.hand_size_min,
        HandSizeMax = r.hand_size_max,
        GripStyles = r.grip_styles,
        ShapeSvg = r.shape_svg,
        Images = r.images,
        Photo = r.photo,
        Colors = r.colors,
        Rating = r.rating,
        ReviewCount = r.review_count
    };
}
