import jwt from "../services/JwtService.js";
import ApiError from "../errors/ApiError.js";

export default async function (req, res, next) {
  if (req.method === "OPTIONS") next();
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return ApiError.unauthorized(res, {
        friendlyMsg: "User not registered",
      });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return ApiError.unauthorized(res, {
        friendlyMsg: "User not registered",
      });
    }

    const [err, decodeData] = await to(jwt.verifyAccess(token));

    if (err) {
      return ApiError.error(res, { friendlyMsg: err.message });
    }
    req.user = decodeData;
    next();
  } catch (error) {
    console.log(error);
    return ApiError.unauthorized(res, { friendlyMsg: "User not registered" });
  }
}

async function to(promice) {
  return promice.then((res) => [null, res]).catch((error) => [error]);
}
