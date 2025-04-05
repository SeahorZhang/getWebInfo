import { defineEventHandler, readBody, } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // // 验证必要的字段
    // if (!body || !body.url) {
    //   return {
    //     success: false,
    //     message: '缺少必要参数，url字段为必填',
    //     data: null
    //   }
    // }


    return body

    // return {
    //   success: true,
    //   message: '操作成功',
    //   data: body
    // }

  } catch (error: any) {
    return {
      success: false,
      message: `操作失败: ${error.message}`,
      data: null
    }
  }
})
