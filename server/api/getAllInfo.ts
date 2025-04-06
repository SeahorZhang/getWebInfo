import FirecrawlApp from '@mendable/firecrawl-js';
const app = new FirecrawlApp({ apiKey: "fc-33568b2257bc447997fb8c0dc7b4c7d3" });

const deleteFields = ['twitter:site', 'twitter:image', 'ogUrl', 'og:image:type', 'og:image:secure_url', 'apple:content_id',
  'og:locale', 'ogImage', 'viewport', 'ac-gn-search-suggestions-enabled', 'globalnav-search-suggestions-enabled', 'og:site_name',
  'og:image', 'applicable-device', 'twitter:card', 'ogLocale', 'favicon', 'og:image:width', 'twitter:image:alt',
  'og:type', 'version', 'og:image:height', 'og:url', 'language', 'ogSiteName', 'web-experience-app/config/environment',
  'og:image:alt', 'scrapeId', 'sourceURL', 'url', 'statusCode',]

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数中的url
    const query = getQuery(event)
    const targetUrl = query.url as string


    const scrapeResult: any = await app.scrapeUrl(targetUrl, {
      formats: ["markdown"],
    });

    console.log(1, scrapeResult)
    if (!scrapeResult.success) {
      throw new Error(`Failed to crawl: ${scrapeResult.error}`)
    }

    const metadata = scrapeResult.metadata
    deleteFields.forEach(field => {
      delete metadata[field]
    })


    return {
      success: true,
      message: '获取网站信息成功',
      data: { ...scrapeResult, metadata }
    }
  } catch (error) {
    return {
      success: false,
      message: '获取网站信息失败',
      data: null
    }
  }
})