/*kapa en webbserver som hanterar en publik respektive en privat URL. I den publika delen visas information som hämtas från en textfil, och i den privata delen (som ”skyddas” genom en kodnyckel i querystringen av URLen, exempelvis http://localhost:8080/secret?key=ALBATROSS) ska ”inloggade” kunna ändra innehållet i textfilen via ett formulär. 
*/
const user = require('./user-module')
const http = require('http')
const url = require('url')
const fs = require('fs')
const express = require('express')
let app = express();
let file = ('./logFile.txt')
let text ;


app.get("/", (req,res) => {
    fs.readFile('./public.txt' ,"utf-8",  (err, data) => {
        if(err){
            res.write('public page not found');
        }else{
            res.write(data);
        }
        res.end();
    });  
    
});

app.get("/secret/",  (req, res) => {
    
    let mykey = req.query.key;
    console.log('key = ' + mykey);

    if(mykey == "ALBATROSS"){
        fs.readFile('secretPage.html' ,  (err, data) => {
            if(err){
                //res.setHeader(403);
                res.write('secret page not found');
            }else{
                res.write(data);
            }
        });  
    }
    else{
        res.send(" your secret word not correct ");
        res.end();
    }
});

app.listen(3000, () => {
    console.log("lyssnar 3000 ")
});
