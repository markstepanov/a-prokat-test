const BP = require("bp-api").default
const bp = new BP("test-a-prokat-mark.bpium.ru", "markstepanov88@gmail.com", "ifjqw!fwheio32", "https", 3000)
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