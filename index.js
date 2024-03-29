var express = require('express')
var request = require('request')
var app = express();

app.set('view engine', 'ejs')

var me = {
          "description": "I am someone who likes to take things in stride and I am for self improvement both physically and mentally.",
          "tech": "I am excited by the chance to make lives easier. I enjoy making things more efficient and I like the idea that I could create something people never realized they needed so much and now couldn't live without.",
          "techstack": "I am proficient with Python, Flask and React.",
          "hobbies": "I enjoy running, playing intramural sports, taking care of cats and most importantly, I love improving myself mentally and physically - I really enjoy web development in this regard because it is very hard but also very rewarding work."
          }
  
app.get('/', (req, rep) => {
    rep.sendFile(__dirname + '/index.html')
})


app.get('/posts', (req, rep) => {
    request('https://jsonplaceholder.typicode.com/posts', (error, response, body) => {
        if (!error && response.statusCode === 200) {
          rep.render('posts', {posts: JSON.parse(body)} );
        } else {
            rep.render('error')
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
        rep.render('error')
    }
})

// * Any request to an endpoint that is not defined should ‘Not Found’ as plain text
app.get('*', (req, rep) => {
    rep.render('error')
})



app.listen(3000, () => {
    console.log('our server is live on port 3000')
})