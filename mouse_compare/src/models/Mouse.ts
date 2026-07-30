export interface Mouse {
  id: string;
  name: string;
  brand: string;
  price: number;
  weight: number;
  dimensions: string;
  length_mm: number;
  width_mm: number;
  height_mm: number;
  sensor: string;
  sensor_desc: string;
  connection: string;
  battery: number;
  switches: string;
  switches_desc: string;
  dpi: number;
  ips: number;
  acceleration: number;
  buttons: number;
  ergonomic: boolean;
  coating: string;
  hand_size_min: number;
  hand_size_max: number;
  grip_styles: string[];
  shape_svg: {
    top: string;
    side: string;
    back: string;
  };
  colors: string[];
  images: {
    top: string;
    side: string;
  };
  photo: string;
  rating: number;
  review_count: number;
}
