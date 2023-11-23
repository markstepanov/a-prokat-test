const express = require("express")
const app = express()
const port = 8000


const middlewares = require("./middleware")

const api = require("./api")
const webhooks = require("./webhooks")





app.use(express.json())
app.use(middlewares.jsonParseExeptionMiddleWare);
app.use(express.static("frontend/dist/spa"))



app.post("/webhook-update-comment", middlewares.webhookAuthMiddleware,webhooks.updateCommentWebhook)
app.post("/webhook-create-warehouse-record", middlewares.webhookAuthMiddleware, webhooks.createWarehouseRecordWebhook)

app.get("/order", api.recordGET)
app.post("/order", api.recordPOST)




app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})