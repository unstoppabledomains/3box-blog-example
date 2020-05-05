import React from "react";

interface Props {
  color: string;
}

const BookmarkAdd: React.FunctionComponent<Props> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0H24V24H0z" />
      <path
        fill={color}
        d="M17 2c1.105 0 2 .895 2 2v1h-2V4H7v15.382l5-2.5 5 2.5V17h2v5.618l-7-3.5-7 3.5V4c0-1.105.895-2 2-2h10zm3 6v2h2v2h-2v2h-2v-2h-2v-2h2V8h2z"
      />
    </g>
  </svg>
);

export default BookmarkAdd;
