var mailSystem = require('./mailSystem');

var backend = {
    transfer:  function(mails) {
        console.log('>>>>>> Transfer emails to backend:', mails);
    }
}

mailSystem.init('info@euri.com');
mailSystem.sendWelcomeMail('peter.cosemans@gmail.com',
                           'Welcome to...',
                           { name: 'peter'});


//mailSystem.transferEuriMails(backend);
