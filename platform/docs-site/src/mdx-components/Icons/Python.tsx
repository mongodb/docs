'use client';

import { useId } from 'react';

type IconPythonProps = React.SVGProps<SVGSVGElement>;

const IconPython = (styles: IconPythonProps) => {
  const hash = useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.6 147" {...styles}>
      <linearGradient
        id={`${hash}aa`}
        gradientUnits="userSpaceOnUse"
        x1="280.848"
        y1="-268.463"
        x2="389.865"
        y2="-362.257"
        gradientTransform="matrix(.5625 0 0 -.568 -160.323 -146.09)"
      >
        <stop offset="0" stopColor="#5a9fd4" />
        <stop offset="1" stopColor="#306998" />
      </linearGradient>
      <path
        d="M55.3 3.2c-4.6 0-9 .4-12.8 1.1-11.3 2-13.4 6.2-13.4 13.9v10.2h26.8v3.4H19c-7.8 0-14.6 4.7-16.8 13.6C-.3 55.6-.4 62 2.2 72.7c1.9 7.9 6.5 13.6 14.2 13.6h9.2V74c0-8.8 7.7-16.7 16.7-16.7h26.8c7.5 0 13.4-6.1 13.4-13.6V18.2c0-7.3-6.1-12.7-13.4-13.9-4.4-.8-9.2-1.1-13.8-1.1zm-14.5 8.2c2.8 0 5 2.3 5 5.1s-2.3 5.1-5 5.1c-2.8 0-5-2.3-5-5.1s2.2-5.1 5-5.1z"
        fill={`url(#${hash}aa)`}
      />
      <linearGradient
        id={`${hash}bb`}
        gradientUnits="userSpaceOnUse"
        x1="432.011"
        y1="-419.025"
        x2="393.081"
        y2="-363.946"
        gradientTransform="matrix(.5625 0 0 -.568 -160.323 -146.09)"
      >
        <stop offset="0" stopColor="#ffd43b" />
        <stop offset="1" stopColor="#ffe873" />
      </linearGradient>
      <path
        d="M86 31.8v11.9c0 9.2-7.8 17-16.8 17H42.5c-7.3 0-13.4 6.3-13.4 13.6v25.5c0 7.3 6.3 11.5 13.4 13.6 8.5 2.5 16.6 2.9 26.8 0 6.8-2 13.4-5.9 13.4-13.6V89.7H55.9v-3.4h40.2c7.8 0 10.7-5.4 13.4-13.6 2.8-8.4 2.7-16.5 0-27.3-1.9-7.8-5.6-13.6-13.4-13.6H86zM71 96.5c2.8 0 5 2.3 5 5.1s-2.3 5.1-5 5.1c-2.8 0-5-2.3-5-5.1-.1-2.8 2.2-5.1 5-5.1z"
        fill={`url(#${hash}bb)`}
      />
      <radialGradient
        id={`${hash}cc`}
        cx="-2274.721"
        cy="144.526"
        r="29.037"
        gradientTransform="matrix(0 -.2399 -1.0547 0 208.637 -414.922)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#b8b8b8" stopOpacity=".498" />
        <stop offset="1" stopColor="#7f7f7f" stopOpacity="0" />
      </radialGradient>
      <path
        d="M92.1 130.9c0 3.8-16.1 7-35.9 7s-35.9-3.1-35.9-7c0-3.8 16.1-7 35.9-7s35.9 3.1 35.9 7z"
        opacity=".444"
        fill={`url(#${hash}cc)`}
      />
    </svg>
  );
};

export default IconPython;
