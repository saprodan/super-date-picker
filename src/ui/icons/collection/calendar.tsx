import type { SVGProps } from "react";
const SvgCalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M4 9V7a2 2 0 0 1 2-2h2M4 9h16m0 0V7a2 2 0 0 0-2-2h-2m0 0V3m0 2H8m0-2v2"
    />
  </svg>
);
export default SvgCalendarIcon;
