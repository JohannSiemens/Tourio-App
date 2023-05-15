import dbConnect from "../../../db/dbconnect";
import Place from "../../../models/place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const place = await Place.find();

      return response.status(200).json(place);
    } catch {
      response.status(500).json({ status: "Bad Response" });
    }
  } else if (request.method === "POST") {
    try {
      const place = request.body;

      const newPlace = {
        name: place.name,
        location: place.location,
        image: place.image,
        mapURL: place.mapURL,
        description: place.description,
      };

      await Place.create(newPlace);

      return response.status(200).json({ status: "New place created!" });
    } catch {
      response.status(500).json({ status: "Bad Response" });
    }
  }
}
