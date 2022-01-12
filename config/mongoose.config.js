const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userauth_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection with the database'))
    .catch(err => console.log('Unable to connect to the database', err));