import ApiError from "../errors/ApiError.js";

export default function (err, req, res, next) {
  console.log(err.message);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.message.includes("Unexpected token")) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Nazarda tutilmagan xatolik" });
};
