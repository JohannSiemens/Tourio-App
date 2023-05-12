import dbConnect from "../../../../db/dbconnect";
import Place from "../../../../models/place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
    return;
  }

  if (request.method === "PATCH") {
    const placeData = request.body;

    await Place.findByIdAndUpdate(id, {
      name: placeData.name,
      location: placeData.location,
      image: placeData.image,
      mapURL: placeData.mapURL,
      description: placeData.description,
    });

    response.status(200).json({ status: "Place with id " + id + " changed!" });
    return;
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ status: "Place with id " + id + " deleted!" });
    return;
  }

  response.status(501).json({ status: "Method not implemented." });
  return;
}
