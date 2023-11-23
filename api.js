const orderRepository = require("./orderRepository")
const Joi  = require("joi")

const recordGET = async (req, res) => {
    try {
        res.json({orders: await orderRepository.getAllOrders()})
    } catch (e) {
        return res.status(406).json({
            message: "Could not fetch orders"
        })
    }

}

const recordPOST = async (req, res) => {
    const comment = req.body.comment
    const schema = Joi.object({
        comment: Joi.string().required()
    })


    let data 
    try {
        data = await schema.validateAsync(req.body)
        await orderRepository.createOrder(data.comment)
        return res.json({status: "ok"})
    } catch (e){
        console.log(e)
        return res.status(406).json({
            message: e
        })
    }
}


module.exports = {
    recordGET,
    recordPOST
}