import { Image } from "@kuma-ui/core";

interface AvatarProps {
  src: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({ src, size = 48, alt }: AvatarProps) => (
  <Image src={src} width={size} height={size} alt={alt} borderRadius={9999} />
);
