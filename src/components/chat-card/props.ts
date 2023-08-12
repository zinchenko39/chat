export interface ChatCardProps {
  id: number;
  title: string;
  avatar: string;
  last_message: string;
  time: string;
  qtyNewMsg: number;
  events?: { click: (event: PointerEvent) => void };
}
