const express = require("express");
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "aebad071",
  apiSecret: "4rd627yvMIX3mxQF"
})
const app = express();

const from = "Cabalou"
const to = "24176200230"
const text = 'Ce messsage a ete envoye depuis'

let req_id = 0;
app.post("/sendmessage",(req,res) =>{
    res.status(200).send("message envoyé");
    // vonage.sms.send({to, from, text})
    //     .then(resp => { console.log('Message sent successfully'); res.status(200).send(resp); })
    //     .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
})
app.get("/",(req,res) =>{
  res.send("hello world");
})
app.get("/verify",(req,res) =>{
    vonage.verify.start({
        number: to,
        brand: "Vonage"
      })
        .then(resp => {
            console.log(resp);
            res.status(200).send(resp);
        })
        .catch(err => console.error(err));
})
app.get("/check",(req,res) =>{
    vonage.verify.check(req_id, 2000)
  .then(resp => {
    console.log(resp);
    res.send(res.json({message : "numero parfaitement verifier"}))
  })
  .catch(err => console.error(err));
})
app.get("/cancel",(req,res) =>{
    vonage.verify.cancel(REQUEST_ID)
  .then(resp => {
    console.log(resp)
    res.send("request cancel");
})
  .catch(err => console.error(err));
})
app.listen(8000,() =>{
    console.log("port 8000 ouvert");
})
