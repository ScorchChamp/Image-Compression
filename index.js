const express = require('express');
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/css/style.css', (req, res) => {
    res.sendFile(__dirname + '/css/style.css', {
        headers: { 'Content-Type': 'text/css' },
    });
});
app.get('/js/app.js', (req, res) => {
    res.sendFile(__dirname + '/js/app.js', {
        headers: { 'Content-Type': 'text/js' },
    });
});

app.listen(7001, () => {
    console.log('Server listening on port 7001');
});

