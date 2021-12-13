module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    alias: {
      "react-dom$": "react-dom/profiling",
    },
  },
};
