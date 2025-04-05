import FirecrawlApp from '@mendable/firecrawl-js';
const app = new FirecrawlApp({ apiKey: "fc-33568b2257bc447997fb8c0dc7b4c7d3" });

export default defineEventHandler(async (event) => {
  try {
    const scrapeResult: any = await app.scrapeUrl("https://iina.io/", {
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