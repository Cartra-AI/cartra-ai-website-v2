/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // QR code in Cartra's ad in the Chinese American CEO Organization's
        // 30th anniversary brochure. The UTM tags attribute these visits (and
        // any consultation requests in the same session) to the ad in GA.
        source: '/30',
        destination: '/?utm_source=caceo&utm_medium=print&utm_campaign=caceo-30th-anniversary',
        permanent: false,
      },
      {
        // Short link Jeff says on cold calls to spa and wellness owners
        // ("cartra.ai/spas"; /spa catches the singular). The UTM tags
        // attribute these visits (and any consultation requests in the same
        // session) to the calls in GA. Emails link to /voice/spas with
        // utm_medium=email instead.
        source: '/spas',
        destination: '/voice/spas?utm_source=outbound&utm_medium=phone&utm_campaign=wellness',
        permanent: false,
      },
      {
        source: '/spa',
        destination: '/voice/spas?utm_source=outbound&utm_medium=phone&utm_campaign=wellness',
        permanent: false,
      },
      // The use case and case study pages were folded into the product pages.
      { source: '/agent-systems', destination: '/agents', permanent: true },
      { source: '/agent-systems/company-knowledge-base', destination: '/brain', permanent: true },
      { source: '/agent-systems/:slug', destination: '/agents', permanent: true },
      { source: '/case-studies', destination: '/agents#results', permanent: true },
      // The SEO service pages were retired; SEO gets its own workstream later.
      { source: '/ai-agent-development-company', destination: '/', permanent: true },
      { source: '/ai-automation-agency', destination: '/', permanent: true },
      { source: '/ai-workflow-automation', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
