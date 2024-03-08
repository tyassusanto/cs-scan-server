const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const common = require('../common/response')

const modelUsers = require('../models/users')
const modelAuth  = require('../models/auth')

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const [user] = await modelUsers.findUsername(username)
        if (!user) return next(createError(403, 'Username belum terdaftar'))
        const hashedPassword = await bcrypt.compare(password, user.password)
        if (!password) return next(createError(403, 'Password Salah'))
        const secretKey = 'kmzway87aa'
        const payload = {
            username: user.username,
            name: user.name,
        }
        const verifToken = {
            expiresIn: '1 day'
        }
        const token = jwt.sign(payload, secretKey, verifToken)
        user.token = token
        const result = {
            id: user.id,
            username: user.username,
            role: user.role_name,
            token:user.token
        }
        res.json({
            code: 200,
            data: result
        })

    } catch (error) {
        res.status(500)
    }
}

const register = async (req, res, next) => {
    try {
        const { username, role_id, password } = req.body
        const userUsername = await modelUsers.findUsername(username)
        if (userUsername.length > 0) {
            return next(createError(403, 'Username sudah terpakai'))
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const userData = {
            // sesuai dengan field database
            user_id: uuid(),
            username,
            password: hashPassword,
            role_id
        }
        const resultRegister = await modelAuth.register(userData)
        common.response(res, userData.username, 201, `Akun berhasil dibuat dengan username, ${username}`)
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

module.exports = {
    login,
    register
}