const express = require("express")
const app = express()
const port = 8000


const middlewares = require("./middleware")

const webhooks = require("./webhooks")



app.use(express.json())
app.use(middlewares.jsonParseExeptionMiddleWare);
app.use(express.static("frontend/dist"))



app.post("/webhook", webhooks.updateCommentWebhook)


app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})