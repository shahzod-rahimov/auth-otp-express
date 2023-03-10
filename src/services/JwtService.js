import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  async verifyAccess(token) {
    return jwt.verify(token, this.accessKey, {});
  }

  async verifyRefresh(token) {
    return jwt.verify(token, this.refreshKey, {});
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export default new JwtService(
  process.env.access_key,
  process.env.refresh_key,
  process.env.access_time,
  process.env.refresh_time
);
