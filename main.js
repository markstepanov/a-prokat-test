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
    // const hmac = crypto.createHmac( 'md5', "jqwpPojwfe2");
    //       hmac.setEncoding('base64');
    //       hmac.write( req.body.toString() );
    //       hmac.end();
    // const signature = hmac.read();
    // console.log(signature, req.headers["x-hook-signature"])
    if (req.body.hook.event != "record.updated"){
        return res.status(406).json({
            message: "This webhook process only 'record.update' queries"
        })
    }

    const values = req.body.payload.values
    const prevValues = req.body.payload.prevValues

    console.log(values, prevValues)


    res.end()
})


app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})