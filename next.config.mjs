import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    document: "/",
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
