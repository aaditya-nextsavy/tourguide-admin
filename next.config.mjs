/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ["www.istockphoto.com","www.pexels.com","images.pexels.com"],
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
  