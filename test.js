const bp = require("./bp").bp
const utils = require("./utils")
const ORDER_CATEGORY_ID = 13
const WAREHOUSE_CATEGORY_ID = 14


async function test() {
    await bp.postRecord(ORDER_CATEGORY_ID, {
        '3': "test post"
    })
}


test()