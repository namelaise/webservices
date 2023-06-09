import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const params = req.body;
  switch (method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("ws-app");
        const params = req.query.id;
        const existingData = await db
          .collection("movies")
          .findOne({ idMovie: params });

        // Traitement pour l'appel GET
        res.status(200).json({ message: "GET request", existingData });
      } catch {
        res
          .status(500)
          .json({ message: "Internal server error" + existingData });
      }
      break;

    case "POST":
      // Traitement pour l'appel POST

      try {
        const client = await clientPromise;
        const db = client.db("ws-app");
        const existingData = await db
          .collection("movies")
          .findOne({ idMovie: params.idMovie });
        if (existingData) {
          console.log("La donnée existe déjà :");
          await db
            .collection("movies")
            .updateOne({ idMovie: params.idMovie }, { $inc: { like: 1 } });
        } else {
          await db
            .collection("movies")
            .insertOne({ idMovie: params.idMovie, like: 1 });
        }
        res.status(200).json({
          message: "Movie created successfully",
          existingData,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Internal server error" + existingData });
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

  res.json({ status: 200, data: null });
}
