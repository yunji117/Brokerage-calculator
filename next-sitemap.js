const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');

module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  sitemapSize: 7000,
};
