const mongoose  = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    telephone: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    }
})

const Contact = mongoose.model('Contact', contactSchema);

exports.Contact = Contact;