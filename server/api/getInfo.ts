import { defineEventHandler, getQuery } from 'h3'
import metascraper from 'metascraper'
import metascraperAuthor from 'metascraper-author'
import metascraperDate from 'metascraper-date'
import metascraperDescription from 'metascraper-description'
import metascraperImage from 'metascraper-image'
import metascraperLogo from 'metascraper-logo'
import metascraperPublisher from 'metascraper-publisher'
import metascraperTitle from 'metascraper-title'
import metascraperUrl from 'metascraper-url'

// 创建metascraper实例，配置所需插件
const scraper = metascraper([
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperPublisher(),
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
    const html = await response.text()

    // 使用metascraper解析网页内容
    const metadata = await scraper({ html, url: targetUrl })

    return {
      success: true,
      message: '获取网站信息成功',
      data: metadata
    }
  } catch (error: any) {
    return {
      success: false,
      message: `获取网站信息失败: ${error.message}`,
      data: null
    }
  }
}) 