var express = require('express')
var request = require('request')
var app = express();

app.set('view engine', 'ejs')

var me = {
          "description": "I am someone who likes to take things in stride. I enjoy running, playing intramural sports, cats and dogs and most importantly, I love improving myself mentally and physically - which is why I really enjoy web development. It is very hard but so rewarding",
          "tech": "I am excited by the chance to make lives easier. I enjoy making things more efficient and I like the idea that I could create something people never realized they needed so much, but now they couldn't live without it",
          "techstack": "what is your preferred tech stack",
          "hobbies": "what are your fav hobbies"
          }
  


app.get('/', (req, rep) => {
    rep.sendFile(__dirname + '/index.html')
})


app.get('/posts', (req, rep) => {
    request('https://jsonplaceholder.typicode.com/posts', (error, response, body) => {
        if (!error && response.statusCode === 200) {
          rep.render('posts', {posts: JSON.parse(body)} );
        } else {
            console.log(error);
        }
    })
})

app.get('/aboutme/', (req, rep) => {
    rep.render('fullbio', { fullbio: 'Full Bio', data: me })
})

app.get('/aboutme/:param', (req, rep) => {
    if (Object.keys(me).includes(req.params.param)){
        rep.render('aboutme', { about :  me[req.params.param], param: req.params.param })
    }
    else {
        rep.status(404).render('Not Found')
    }
})

// * Any request to an endpoint that is not defined should ‘Not Found’ as plain text
app.get('*', (req, rep) => {
    rep.status(404).render('Not Found')
})




app.listen(3000, () => {
    console.log('our server is live on port 3000')
})