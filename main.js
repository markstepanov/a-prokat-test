const express = require("express")
const app = express()
const port = 8000


const middlewares = require("./middleware")
const cors = require("cors")

const api = require("./api")
const webhooks = require("./webhooks")





app.use(express.json())
app.use(middlewares.jsonParseExeptionMiddleWare);
app.use(express.static("frontend/dist/spa"))
app.use(cors())



app.post("/webhook-update-comment", webhooks.updateCommentWebhook)
app.post("/webhook-create-warehouse-record", webhooks.createWarehouseRecordWebhook)

app.get("/order", api.recordGET)
app.post("/order", api.recordPOST)




app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})