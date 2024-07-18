import createNextIntlPlugin from 'next-intl/plugin';


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ["default", "pt-BR", "en-US"],
  //   defaultLocale: "default",
  // },
};

export default withNextIntl(nextConfig);
