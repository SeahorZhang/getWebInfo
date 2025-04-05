import FirecrawlApp from '@mendable/firecrawl-js';
const app = new FirecrawlApp({ apiKey: "fc-33568b2257bc447997fb8c0dc7b4c7d3" });

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数中的url
    const query = getQuery(event)
    const targetUrl = query.url as string


    const scrapeResult: any = await app.scrapeUrl(targetUrl, {
      formats: ["markdown"],
    });

    if (!scrapeResult.success) {
      throw new Error(`Failed to crawl: ${scrapeResult.error}`)
    }

    return {
      success: true,
      message: '获取网站信息成功',
      data: scrapeResult
    }
  } catch (error) {
    return {
      success: false,
      message: '获取网站信息失败',
      data: null
    }
  }
})