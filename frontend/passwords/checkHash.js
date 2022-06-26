const bcrypt = require('bcryptjs')


export default function checkHashPassword(password="", hash=""){
    // returns bool

    if(!(password.length && hash.length) || bcrypt.compareSync(password, hash)){
        return true
    } else {
        return false
    }
}

