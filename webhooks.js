const orderRepository = require("./orderRepository")

const updateCommentWebhook = async (req, res) => {
    if (req.body.hook.event != "record.updated"){
        return res.status(406).json({
            message: "This webhook process only 'record.update' queries"
        })
    }

    const values = req.body.payload.values
    const prevValues = req.body.payload.prevValues

    if (values['2'] === prevValues['2']){ 
        return res.end()
    } 

    try {
        await orderRepository.updateOrderComment(req.body.payload.recordId)
    } catch (e) {
        return res.status(406).json({
            message: "Could not Update Comment"
        })
    }

    res.end()
}

const createWarehouseRecordWebhook = async (req, res) => {
    console.log(req.body)
    res.end()
}

module.exports = {
    updateCommentWebhook,
    createWarehouseRecordWebhook
}