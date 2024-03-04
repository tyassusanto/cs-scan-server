const connection = require('../common/connection')

const register = (userData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users SET ?`
        connection.query(query, userData, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    register
}