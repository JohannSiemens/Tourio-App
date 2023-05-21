import dbConnect from "../../../../db/dbconnect";
import Place from "../../../../models/place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
      try {
        const place = await Place.findById(id);
        place
          ? response.status(200).json(place)
          : response.status(404).json({ status: "Not Found" });
        return;
      } catch {
        response.status(500).json({ status: "Bad Response" });
      }

    case "PATCH":
      try {
        const placeData = request.body;
        await Place.findByIdAndUpdate(id, {
          name: placeData.name,
          location: placeData.location,
          image: placeData.image,
          mapURL: placeData.mapURL,
          description: placeData.description,
        });
        return response
          .status(200)
          .json({ status: "Place with id " + id + " changed!" });
      } catch {
        return response.status(500).json({ status: "Bad Response" });
      }

    case "DELETE":
      try {
        await Place.findByIdAndDelete(id);
        return response
          .status(200)
          .json({ status: "Place with id " + id + " deleted!" });
      } catch {
        return response.status(500).json({ status: "Bad Response" });
      }
    default:
      return response.status(500).json({ status: "Method not implemented" });
  }
}
