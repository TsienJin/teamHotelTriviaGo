const bcrypt = require('bcryptjs')


export default function hashPassword(password=""){
    // returns string

    if(password.length){
        const salt = bcrypt.genSaltSync(10)
        return(bcrypt.hashSync(password, salt))
    } else {
        return('')
    }
}

