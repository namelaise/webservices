import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("ws-app")
    const movies = await db.collections("movies".find({})).limit(10).toArray();
    res.json({status: 200, data:movies})
}