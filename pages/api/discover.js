import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=419792151adc3b81b360237e74ff412a"
    );

    const data = await response.json();
    res.status(200).json({ movies: data.results });
  } catch {
    console.error("");
    res.status(200).json({ movies: data.results });
  }
}
