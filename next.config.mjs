const isGitHubPages = process.env.PAGES_STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: '/Sherhan',
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
