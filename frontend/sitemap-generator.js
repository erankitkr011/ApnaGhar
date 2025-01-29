const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

async function generateSitemap() {
    try {
        const sitemapStream = new SitemapStream({ hostname: 'https://dularibhawan.store' });

        const writeStream = fs.createWriteStream('./public/sitemap.xml');
        sitemapStream.pipe(writeStream);

        const links = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/about', changefreq: 'weekly', priority: 0.8 },
            { url: '/contact', changefreq: 'monthly', priority: 0.5 },
            { url: '/login', changefreq: 'monthly', priority: 0.6 },
            { url: '/signupbittu', changefreq: 'monthly', priority: 0.6 },
            { url: '/payment-history', changefreq: 'weekly', priority: 0.7 },
            { url: '/admin', changefreq: 'weekly', priority: 0.9 },
            { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.4 },
            { url: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
            { url: '/refunds-cancellations', changefreq: 'yearly', priority: 0.4 }
        ];

        links.forEach(link => sitemapStream.write(link));

        sitemapStream.end();

        await streamToPromise(sitemapStream);
        
        console.log('✅ Sitemap generated successfully.');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
    }
}

generateSitemap();
