/** @type {import('next').NextConfig} */


const nextConfig = {
    webpack(config, {isServer}) {
        config.module.rules.push({
          test: /\.svg$/,
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
          },
        });

        if (!isServer) {
          config.resolve.fallback = {
              ...config.resolve.fallback,
              fs: false, // This might be needed to handle certain webpack issues
          };
      }
    
        return config;
      },
      images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['lh3.googleusercontent.com']
      },
};

export default nextConfig;
