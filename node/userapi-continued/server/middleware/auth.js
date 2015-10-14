var base64 = require('base64-url');

module.exports = function(pw) {
    return function(req, res, next) {
        var tmpString = req.headers.authorization;
        tmpString = tmpString.split(" ");
        tmpString = base64.decode(tmpString[1]).split(":");
        var uname = tmpString[0];
        var upw = tmpString[1];

        //console.log(`login for username: ${uname} with password: ${upw}`);
        if(upw !== pw) {
            return res.status(401).send('wrong passphrase');
        }

        req.user = {
            username: uname
        }

        next();
    }
};


function error(status) {
    var error = new Error('an error occured');
    error.status = status;
    return error;
}
