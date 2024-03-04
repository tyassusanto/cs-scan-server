const connection = require('../common/connection')
// u.user_id, u.username, r.role_name
const findUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users u JOIN roles r ON u.role_id = r.role_id WHERE username = ?`
        connection.query(query, username, (error, result) => {
            if(!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users `
        connection.query(query, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    findUsername,
    getAllUsers
}