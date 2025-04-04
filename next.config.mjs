/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ["www.istockphoto.com"],
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/tours/all-tours",
          permanent: false, 
        },
      ];
    },
  };
  
  export default nextConfig;
  