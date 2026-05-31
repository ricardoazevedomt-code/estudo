/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure Turbopack resolves from the project root
  // (required after upgrading Next.js)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  turbopack: { root: '.' },
};

module.exports = nextConfig;
