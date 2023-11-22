const express = require("express")
const app = express()
const port = 8000

const BP = require("bp-api").default
const bp = new BP("test-a-prokat-mark.bpium.ru", "markstepanov88@gmail.com", "ifjqw!fwheio32", "https", 3000)



app.use(express.json())
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
});

app.use(express.static("frontend/dist"))


app.post("/webhook", (req, res) => {
    console.log(req.headers)
    console.log("===================")
    console.log(req.body)
    res.end()
})


app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})