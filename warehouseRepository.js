const bp = require("./bp").bp
const WAREHOUSE_CATEGORY_ID = 14



/** 
 * @throws {Error}
 */
const createWarehouseRecord = async (orderId, comment) => {
    await bp.postRecord(WAREHOUSE_CATEGORY_ID, {
        '3': comment,
        '4': [
            {
                catalogId: 13,
                recordId: orderId,

            }
        ]

    })
}


module.exports = {
    createWarehouseRecord
}

