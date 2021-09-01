import db from "../../../libs/db"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, password } = req.body

    const userCheck = await db('users').where({ email }).first()
    if (!userCheck) return res.status(401).end()

    const checkPassword = await bcrypt.compare(password, userCheck.password)
    if (!checkPassword) return res.status(401).end()

    const token = jwt.sign({
        id: userCheck.id,
        email: userCheck.email
    }, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: '7d'
    })

    res.status(200)
    res.json({
        messege: 'Login successfully',
        token
    })
}