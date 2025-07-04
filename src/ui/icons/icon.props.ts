import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;
}

export type IconName = "arrow-right" | "arrow-left" | "calendar";
