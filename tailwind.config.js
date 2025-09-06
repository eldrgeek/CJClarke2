/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CJ Clarke Campaign - Patriotic Red, White, Blue
        'cj-red': '#DC2626',     // Primary Red - CTAs, highlights
        'cj-blue': '#1E40AF',    // Primary Blue - headers, navigation
        'cj-white': '#FFFFFF',   // White - backgrounds, contrast
        // Gray scale for text and subtle elements
        'cj-gray-50': '#F8FAFC',
        'cj-gray-100': '#E2E8F0',
        'cj-gray-200': '#64748B',
        'cj-gray-900': '#1E293B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
