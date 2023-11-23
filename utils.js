const axios = require("axios")

const getCommentValue = async () => {

    const a = await axios.get("https://test.bpium.ru/api/webrequest/request")
    return a.data.value 
}

module.exports = {
    getCommentValue
}

