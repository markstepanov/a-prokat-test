const express = require("express")
const app = express()
const port = 8000

const BP = require("bp-api").default
const bp = new BP("test-a-prokat-mark.bpium.ru", "markstepanov88@gmail.com", "ifjqw!fwheio32", "https", 3000)
const crypto = require("crypto")



app.use(express.json())
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
});

app.use(express.static("frontend/dist"))

app.post("/webhook",  (req, res) => {
    const hmac = crypto.createHmac( 'md5', "97a0d22c9ad154abb460037b6201b126922ba38d");
          hmac.setEncoding('base64');
          hmac.write( req.body.toString() );
          hmac.end();
    const signature = hmac.read();
    console.log(signature, req.headers["x-hook-signature"])
    

    res.end()
})


app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})