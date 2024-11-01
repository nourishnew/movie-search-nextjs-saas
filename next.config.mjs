/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
