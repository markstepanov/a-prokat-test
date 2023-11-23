const crypto = require("crypto")


const webhookAuthMiddleware = (req, res, next) => {

    const hmac = crypto.createHmac( 'md5', "jqwpPojwfe2");
          hmac.setEncoding('base64');
          hmac.write( req.body.toString() );
          hmac.end();
    const signature = hmac.read();
    console.log(signature, req.headers["x-hook-signature"])
    if (signature === "yrJFnkH43hixi/czqFYH8w=="){ // ALL WEBHOOKS WITH "jqwpPojwfe2" key produces "yrJFnkH43hixi/czqFYH8w==" value. It's may be bug on bipium side.
        next()
    } else {
        return res.status(401)
    }

}


const jsonParseExeptionMiddleWare = (err, req, res, next) => {
     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 404, message: err.message })
    }
    next();

}

module.exports = {
    jsonParseExeptionMiddleWare,
    webhookAuthMiddleware
}