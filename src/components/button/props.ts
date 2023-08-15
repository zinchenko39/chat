export interface ButtonProps {
  text: string;
  bgColor?: string;
  width?: string;
  type?: string;
  events?: { click: (event: PointerEvent) => void };
}
