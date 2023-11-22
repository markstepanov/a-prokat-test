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

function calculateSignature(key) {
    return function(req, res, next) {
        var hash = req.header("x-hook-signature"),
            hmac = crypto.createHmac("md5", key);

        req.on("data", function(data) {
            hmac.update(data);
        });

        req.on("end", function() {
            var crypted = hmac.digest("hex");

            if(crypto.timingSafeEqual(
              Buffer.from(crypted),
              Buffer.from(hash.padEnd(crypted.length))
            )) {
                // Valid request
                return res.send("Success!", { "Content-Type": "text/plain" });
            } else {
                // Invalid request
                return res.send("Invalid TrialPay hash", { "Content-Type": "text/plain" }, 403);
            }
        });

        req.on("error", function(err) {
            return next(err);
        });
    }
}

app.post("/webhook", calculateSignature("97a0d22c9ad154abb460037b6201b126922ba38d"), (req, res) => {
    console.log("here!")

    res.end()
})


app.listen(port,async ()=> {
    console.log("app runs on port " + port)
})