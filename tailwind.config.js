module.exports = {
  mode: 'jit',
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  // content: [],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
