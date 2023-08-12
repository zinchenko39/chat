export interface InputWrapperProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  width?: number | string;
  textAlign?: string;
  error?: string;
  gap?: number;
  events?: {
    change?: (event: PointerEvent) => void;
    blur?: (event: PointerEvent) => void;
  };
  value?: string;
}
