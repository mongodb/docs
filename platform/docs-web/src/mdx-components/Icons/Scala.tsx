'use client';

import { useId } from 'react';

type IconScalaProps = React.SVGProps<SVGSVGElement>;

const IconScala = (styles: IconScalaProps) => {
  const hash = useId();
  return (
    <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" {...styles}>
      <defs>
        <linearGradient x1=".006%" y1="49.998%" x2="96.837%" y2="49.998%" id={`${hash}aaa`}>
          <stop stopColor="#CD413F" offset="0%" />
          <stop stopColor="#CD4543" offset="75.091%" />
          <stop stopColor="#D04543" offset="100%" />
        </linearGradient>
      </defs>
      <g fillRule="nonzero" fill="none">
        <path
          d="M13 39v5c0 .843 17.73 2.255 29.28 5 5.582-1.327 9.72-2.966 9.72-5v-5c0-2.034-4.138-3.673-9.72-5C30.73 36.745 13 38.157 13 39M13 20v5c0 .843 17.73 2.255 29.28 5 5.582-1.327 9.72-2.966 9.72-5v-5c0-2.034-4.138-3.673-9.72-5C30.73 17.745 13 19.157 13 20"
          fill="#731818"
        />
        <g fill={`url(#${hash}aaa)`} transform="translate(13)">
          <path d="M0 29.53v14.766c0-1.232 39-3.692 39-9.844V19.686c0 6.152-39 8.612-39 9.844M0 9.843V24.61c0-1.231 39-3.691 39-9.843V0C39 6.152 0 8.612 0 9.843M0 49.216v14.766c0-1.231 39-3.691 39-9.843V39.373c0 6.151-39 8.612-39 9.843" />
        </g>
      </g>
    </svg>
  );
};

export default IconScala;
