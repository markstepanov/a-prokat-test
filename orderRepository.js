const bp = require("./bp").bp
const utils = require("./utils")

const ORDER_CATEGORY_ID = 13




/** 
 * @throws {Error}
 */
const updateOrderComment = async (orderId) => {
    const commentValue = await utils.getCommentValue()
    await bp.patchRecord(ORDER_CATEGORY_ID,  orderId, {
        '3' : commentValue
    })
}


/** 
 * @throws {Error}
 */
const getAllOrders = async () => {
    return await bp.getAllRecords(13)
}



/** 
 * @throws {Error}
 */
const createOrder = async (comment) => {
    await bp.postRecord(ORDER_CATEGORY_ID, {'3': comment})
}


module.exports = {
    updateOrderComment,
    getAllOrders,
    createOrder

}