import { defineEventHandler, readBody } from 'h3'

// 在实际应用中，这里应该连接到数据库
// 这里仅作为示例，使用内存变量模拟存储
const dataStore: Record<string, any> = {}

export default defineEventHandler(async (event) => {
  try {
    // 读取请求体中的数据
    const body = await readBody(event)
    
    // 验证必要的字段
    if (!body || !body.url) {
      return {
        success: false,
        message: '缺少必要参数，url字段为必填',
        data: null
      }
    }
    
    // 验证数据格式
    const { url, title, description, image, metadata } = body
    
    // 存储数据
    // 在实际应用中，这里应该是数据库操作
    const timestamp = new Date().toISOString()
    const id = `data_${Date.now()}`
    
    dataStore[id] = {
      id,
      url,
      title,
      description,
      image,
      metadata: metadata || {},
      createdAt: timestamp,
      updatedAt: timestamp
    }
    
    return {
      success: true,
      message: '网站信息保存成功',
      data: {
        id,
        url,
        createdAt: timestamp
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: `保存网站信息失败: ${error.message}`,
      data: null
    }
  }
})
