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
/* let server= http.createServer((req,res) =>{
   // res.statusCode = 403; res.writeHead(403)
    fs.readFile(file, function(err,data){
        if(err) return console.log(err)
        else{
            text = data.toString();
                console.log(text);
        }
    })
    // Här kollar vi url och auth

    //Utvinna data ur URL
    // Method 1 - url (deprecated)
    let urlData = url.parse(req.url, true);
    console.log("metod 1: " + urlData.query);

    let credentials = url.parse(req.url,true)

    // Hämta värden för loggfilen
    let urlFacts = req.headers.host + req.url
    let now = new Date()
    let logString = urlFacts + ": " + now + "/n" // /n är radmatning

    fs.writeFile('./logFile.txt', logString,{
        //om vi sätter flagan till r: read => läsa från filen
        
        flag: 'a' // append , w: write , r: read
    }, (err) => {
        if(err) throw err
        console.log("Loggfilen är uppdaterad")
    })
    res.write('<html><head><meta charset="utf-8">')
    res.write('<h2>Welcome <p> ${text}')
    /*if (user.userID == credentials.query.userID && user.password == credentials.query.password) {
        res.write(`<h1>Userinfo</h1><p> ${user.name} <p>${user.credits}`)
    } else {
        res.writeHead(403,'Fel behörighet')
        res.write("Not authorized")
    }*/
    /*function goSecretPage(req,res){
    fs.readFile('./secretPage.html' , (err, data) => {
        res.writeHead(200, { 'Content-type' : 'text/html'});
        if(err){
            res.write(err);
            res.write('secret page not found');
        }else{
            res.write(data);
        }
    }); 
}
*/

  /*  let params = url.parse(req.url, true)

    // vår information finns i objektet params.query
    if (params.query.userID == user.userID && params.query.password == user.password) {
        res.write(`<h1>Userinfo</h1><p> ${user.name} <p>${user.credits}`)
    } else {
        res.writeHead(403)
        res.write("Not authorized")
    }
    

    res.end()
})
app.get("/secret/", function(req,res) {
   
    res.send('welcome please write the secret word in url to go to secret page');
    
});

server.listen(3000, () => {
    console.log("Lyssnar på 3000")
}); */