const bcrypt = require('bcrypt')


const encryptUserPassword = async (password) => {
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_SALT))
    return passwordHash
}


module.exports = { encryptUserPassword }