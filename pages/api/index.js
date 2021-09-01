export default function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end()

    res.status(200)
    res.json({
        'created-by': 'Muhammad Wildan Ardiansyah',
        description: 'Api ini dibuat untuk belajar',
        'social-media': {
            github: 'https://github.com/WildanArd03',
            linkedIn: 'https://www.linkedin.com/in/wildan-ardiansyah/',
            instagram: 'https://www.instagram.com/wild4nard/'
        }
    })
}