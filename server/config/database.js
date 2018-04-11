//ma hoa secret
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/meandb',
    secret: crypto,
    db: 'meandb'
}