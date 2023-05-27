export interface InputProps {
  name: string;
  placeholder: string;
  type?: string;
  textAlign?: string;
  events?: {
    change?: (event: PointerEvent) => void;
    blur?: (event: PointerEvent) => void;
  };
}
