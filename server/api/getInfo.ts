import { defineEventHandler, getQuery } from 'h3'
import metascraper from 'metascraper'
import metascraperDescription from 'metascraper-description'
import metascraperTitle from 'metascraper-title'
import metascraperUrl from 'metascraper-url'

// 创建metascraper实例，配置所需插件
const scraper = metascraper([
  metascraperDescription(),
  metascraperTitle(),
  metascraperUrl()
])

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数中的url
    const query = getQuery(event)
    const targetUrl = query.url as string
    
    if (!targetUrl) {
      return {
        success: false,
        message: '缺少URL参数',
        data: null
      }
    }
    
    // 使用fetch获取网页内容
    const response = await fetch(targetUrl)
    console.log(1,response)
    const html = await response.text()

    // 使用metascraper解析网页内容
    const metadata = await scraper({ html, url: targetUrl })
    const description = metadata.description ? (metadata.description.length > 100 ? metadata.description.slice(0, 100) : metadata.description) : metadata.title

    return {
      success: true,
      message: '获取网站信息成功',
      data: { ...metadata, description: description }
    }
  } catch (error: any) {
    return {
      success: false,
      message: `获取网站信息失败: ${error.message}`,
      data: null
    }
  }
}) 