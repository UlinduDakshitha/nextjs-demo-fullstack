/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["sequelize", "mysql2", "pg", "pg-hstore"],
};

export default nextConfig;
