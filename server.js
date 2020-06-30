const app = require('./app');
const keys = require('./config/keys');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(data => {
        console.log('MongoDB has connected...');
    }).catch(e => console.log('mongoDB error:', e));

app.listen(keys.port, () => console.log(`Server is running on port ${keys.port}`));
