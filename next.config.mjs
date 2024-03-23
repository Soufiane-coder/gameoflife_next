/** @type {import('next').NextConfig} */


const nextConfig = {
    webpack(config, {isServer}) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        });

        if (!isServer) {
          config.resolve.fallback = {
              ...config.resolve.fallback,
              fs: false, // This might be needed to handle certain webpack issues
          };
      }
    
        return config;
      },
    // images: {
    //     dangerouslyAllowSVG: true,
    //     contentDispositionType: 'attachment',
    //     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // }
};

export default nextConfig;
