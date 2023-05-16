const https = require('https');
const axios = require('axios');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

app.use(function (re, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})
app.use(express.json());
 
app.post('/', async(req, res) => {
    console.log("get request",req);
    const options = {
        headers: {
            'X-Custom-Header': 'value',
            'Origin':'https://www.web3tasks.xyz',
            'Referer':'https://www.web3tasks.xyz',
            'Sec-Fetch-Site':'cross-site',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        },
     };
     let response = await axios.post('https://web3tasks-backend.onrender.com/',req.body,options)
     res.json(response.data);
});

app.listen(port);


const backend = ()=>{
    const options = {
        headers: {
            'X-Custom-Header': 'value',
            'Origin':'https://www.web3tasks.xyz',
            'Referer':'https://www.web3tasks.xyz',
            'Sec-Fetch-Site':'cross-site',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        },
     };
    const body = {
        address: '0x9fEA74e28966f9f8ae6Fae75D4F4DdbbC82A09bf',
        retweet: "https://twitter.com/test02177131704/status/1658167814895665152",
        telegram: '5946160942',
        twitter: 'test02177131704'
     };
     axios.post('https://web3tasks-backend.onrender.com/',body,options).then((res)=>{
        console.log(res.data);
        // res.status(200).json({ status: 'success' });
    })
}