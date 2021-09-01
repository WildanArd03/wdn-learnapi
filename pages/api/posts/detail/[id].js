import db from "../../../../libs/db";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end()

    const { id } = req.query

    const post = await db('posts').where({ id }).first()
    if (!post) return res.status(404).end()

    res.status(200)
    res.json({
        messege: 'Data Post',
        data: post

    })
}
