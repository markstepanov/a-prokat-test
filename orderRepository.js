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


module.exports = {
    updateOrderComment
}