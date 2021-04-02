require('dotenv').config()
const axios = require('axios')

axios.get(`http://${process.env.EC2_SERVER}:3000/current-time`).then((res) => {
    let time = new Date(res.data.time)
    console.log(time.toLocaleDateString())
    console.log(time.toDateString())
    console.log(time.toGMTString())
})