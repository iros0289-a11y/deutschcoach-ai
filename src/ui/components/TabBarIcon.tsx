import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type TabIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type TabBarIconProps = {
  name: TabIconName;
  color: ComponentProps<typeof MaterialCommunityIcons>["color"];
  size: number;
};

export function TabBarIcon({ color, name, size }: TabBarIconProps) {
  return <MaterialCommunityIcons color={color} name={name} size={size} />;
}
