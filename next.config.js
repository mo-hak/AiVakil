/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KAGGLE_USERNAME: process.env.KAGGLE_USERNAME,
    KAGGLE_KEY: process.env.KAGGLE_KEY,
  },
}

module.exports = nextConfig 