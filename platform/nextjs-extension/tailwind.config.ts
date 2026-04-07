import config from '@netlify/sdk/ui/react/tailwind-config';

export default {
  presets: [config],
  content: ['./src/ui/index.html', './src/ui/**/*.{js,jsx,ts,tsx}'],
};
