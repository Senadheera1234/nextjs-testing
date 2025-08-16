// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,   // Hide "X-Powered-By" for a tiny security hardening
  swcMinify: true,          // Ensure SWC minification (default in recent Next)

  async redirects() {
    return [
      {
        source: '/apps/mail',
        destination: '/apps/mail/inbox',
        permanent: true,
      },
    ];
  },

  // If you serve images from external hosts, allow them here:
  // images: {
  //   remotePatterns: [
  //     { protocol: 'https', hostname: 'cdn.example.com' },
  //     // add more hosts as needed
  //   ],
  // },

  // ───────── Optional “unblock CI” switches (use sparingly) ─────────
  // If you are temporarily blocked by TS or ESLint during early integration,
  // you can enable these to keep deployments flowing. Remove before prod.
  // typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
