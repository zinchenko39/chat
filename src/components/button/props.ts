export interface ButtonProps {
  text: string;
  width?: string;
  type?: string;
  events?: { click: (event: PointerEvent) => void };
}
