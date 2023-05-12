import dbConnect from "../../../db/dbconnect";
import Place from "../../../models/place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.find();
    response.status(200).json(place);
    return;
  }

  if (request.method === "POST") {
    const place = request.body;

    const newPlace = {
      name: place.name,
      location: place.location,
      image: place.image,
      mapURL: place.mapURL,
      description: place.description,
    };

    await Place.create(newPlace);

    response.status(200).json({ status: "New place created!" });
    return;
  }
}
