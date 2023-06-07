import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      //   const likes = await db.collection("likes").find({}).toArray();

      // Traitement pour l'appel GET
      res.status(200).json({ message: "GET request" });
      break;

    case "POST":
      // Traitement pour l'appel POST
      const params = req.body;
      try {
        const client = await clientPromise;
        const db = client.db("ws-app");
        await db.collection("movies").insertOne({ idMovie: idMovie });
        res.status(200).json({ message: "Movie created successfully", movie });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "PUT":
      // Traitement pour l'appel PUT
      res.status(200).json({ message: "PUT request" });
      break;
    case "DELETE":
      // Traitement pour l'appel DELETE
      res.status(200).json({ message: "DELETE request" });
      break;
    default:
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }

  res.json({ status: 200, data: likes });
}
