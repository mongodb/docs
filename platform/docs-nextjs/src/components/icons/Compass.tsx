'use client';

import { useId } from 'react';

type IconCompassProps = React.SVGProps<SVGSVGElement>;

const IconCompass = (styles: IconCompassProps) => {
  const hash = useId();
  return (
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...styles}>
      <defs>
        <linearGradient x1="89.075%" y1="84.272%" x2="19.622%" y2="10.444%" id={`${hash}a`}>
          <stop stopColor="#166149" offset="0%" />
          <stop stopColor="#11A750" offset="37%" />
          <stop stopColor="#48B75B" offset="65%" />
          <stop stopColor="#76C692" offset="93%" />
          <stop stopColor="#87CBA0" offset="100%" />
        </linearGradient>
        <linearGradient x1="102.721%" y1="32.946%" x2="23.585%" y2="85.781%" id={`${hash}b`}>
          <stop stopColor="#8ACDA3" offset="0%" />
          <stop stopColor="#79C692" offset="7%" />
          <stop stopColor="#4CB85B" offset="35%" />
          <stop stopColor="#16AA51" offset="63%" />
          <stop stopColor="#166149" offset="100%" />
        </linearGradient>
      </defs>
      <g fillRule="nonzero" fill="none">
        <path
          d="M16.2 14.4c-1.2 1.6-2.9 2.7-4.8 3.3L15 2.3c3.5 3.1 4 8.4 1.2 12.1zM13.7 1.4L0 9.1c-.1-5 3.9-9 8.9-9.1 1.7 0 3.4.4 4.8 1.4z"
          fill="#11A750"
        />
        <path d="M9.7 18c-4.5.3-8.6-2.7-9.5-7.2l7 .5L9.7 18z" fill={`url(#${hash}a)`} />
        <path d="M13.6 2.9l-3.2 13.4-2.1-5.8c0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.1l-6.2-.4 12-6.8z" fill="#87CBA0" />
        <path
          d="M13.6 2.9l-3.2 13.4-2.1-5.8c0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.1l-6.2-.4 12-6.8z"
          fill={`url(#${hash}b)`}
        />
      </g>
    </svg>
  );
};

export default IconCompass;
