export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 20px 80px rgba(168, 85, 247, 0.18)'
      }
    }
  },
  plugins: []
}
