const { User } = require('../../models')
const { comparePassword } = require('../../helpers/bcrypt')
const { generateToken } = require('../../helpers/jwt')

class UserController{
    static async register(req, res){
        try {
            const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.create(opt)
            const response = {
                id: result.id,
                email: result.email
            }

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async login(req, res){
        try {
           const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.findOne({
                where: {
                    email: opt.email
                }
            })

            if(!result){
                return res.status(401).json({
                    message: 'Invalid email / password'
                })
            }

            const match = comparePassword(opt.password, result.password)

            if(match){
                const payload = {
                    id: result.id,
                    email: result.email
                }

                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token
                })
            } else {
                return res.status(401).json({
                    message: 'Invalid email / password'
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = UserController