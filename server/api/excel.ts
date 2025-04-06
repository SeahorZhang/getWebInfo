import { BaseClient } from '@lark-base-open/node-sdk';

const client = new BaseClient({
  appToken: 'HAibbEvZ1aPPmBs44QlcL8ZVnyG',
  personalBaseToken: 'pt-HwlC-wVBSnlcASG6sMrGi8YiAGNfhL3wZzK-8GeWAQAAE4BAxAFAAuSp7VAF'
});

export default defineEventHandler(async (event) => {
  const res = await client.base.appTableRecord.list({
    path: {
      table_id: 'tblTZ5RaGXWhfoNk'
    },
    params: {
      page_size: 100,
    },
  });

  console.log(11, res)
  return res
})
