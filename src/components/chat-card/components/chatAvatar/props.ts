export interface IChatAvatarProps {
  avatar: string;
  events?: { change: (event: PointerEvent) => void };
}
