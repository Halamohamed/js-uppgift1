/*kapa en webbserver som hanterar en publik respektive en privat URL. I den publika delen visas information som hämtas från en textfil, och i den privata delen (som ”skyddas” genom en kodnyckel i querystringen av URLen, exempelvis http://localhost:8080/secret?key=ALBATROSS) ska ”inloggade” kunna ändra innehållet i textfilen via ett formulär. 

Betyg som ges: IG/G. 

För G krävs  

att applikationen använder lämpliga moduler 
att obehöriga inte kommer åt den privata delen 
att variabelnamn och liknande har en konsekvent och lättförståelig namngivning localhost:3000/: Wed Sep 16 2020 14:10:28 GMT+0200 (Central European Summer Time)/nlocalhost:3000/: Wed Sep 16 2020 14:10:52 GMT+0200 (Central European Summer Time)/nlocalhost:3000/: Wed Sep 16 2020 14:13:41 GMT+0200 (Central European Summer Time)/nlocalhost:3000/: Wed Sep 16 2020 14:14:41 GMT+0200 (Central European Summer Time)/n
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
    res.send("welcome to localhost")
});

app.get("/secret/", function (req, res) {
    
    let mykey = req.query.key;
    //console.log('req.url = ' + req.url.query);
    console.log('key = ' + mykey);
    //console.log('req.url.key = ' + req.url.key);
    //goSecretPage();
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
