import { encode, decode } from "../services/crypt.js";
import { v4 as uuidv4 } from "uuid";
import otpGenerator from "otp-generator";
import jwt from "../services/JwtService.js";
import ApiError from "../errors/ApiError.js";
import { UsersModel } from "../models/UsersModel.js";
import { OTPModel } from "../models/OTPModel.js";

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

async function createUserAccount(req, res) {
  try {
    const { username, fullname, phone_number } = req.body;

    const isUsernameExisted = await UsersModel.findOne({ where: { username } });
    const isNumberExisted = await UsersModel.findOne({
      where: { phone_number },
    });

    if (isUsernameExisted) {
      return ApiError.error(res, {
        friendlyMsg: "Username already exists!",
      });
    }

    if (isNumberExisted) {
      return ApiError.error(res, {
        friendlyMsg: "Phone number already exists!",
      });
    }

    const user = await UsersModel.create({
      fullname: fullname,
      username: username,
      phone_number: phone_number,
    });

    // Generate OTP
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 3);

    const newOtp = await OTPModel.create({
      id: uuidv4(),
      otp,
      expiration_time,
    });

    user.otp_id = newOtp.dataValues.id;
    await user.save();

    const details = {
      timestamp: now,
      check: phone_number,
      success: true,
      message: "OTP sent to user",
      otp_id: newOtp.dataValues.id,
    };

    const encoded = await encode(JSON.stringify(details));

    res.status(201).send({ verification_key: encoded });
  } catch (error) {
    return ApiError.internal(res, {
      message: error,
      friendlyMsg: "Server Error",
    });
  }
}

async function verifyUserOtp(req, res) {
  try {
    const { verification_key, otp, check } = req.body;

    var currentdate = new Date();
    let decoded;
    try {
      decoded = await decode(verification_key);
    } catch (err) {
      return res.status(400).send({ msg: "Bad Request" });
    }

    var obj = JSON.parse(decoded);

    const check_obj = obj.check;

    if (check_obj != check) {
      return ApiError.error(res, {
        friendlyMsg: "OTP was not sent to this particular phone number",
      });
    }
    let params = {
      id: obj.otp_id,
    };

    const otpResult = await OTPModel.findOne({ where: { id: params.id } });
    const result = otpResult.dataValues;

    if (result != null) {
      //Check if OTP is already used or not
      if (result.verified != true) {
        //Check if OTP is expired or not
        if (dates.compare(result.expiration_time, currentdate) == 1) {
          //Check if OTP is equal to the OTP in the DB

          if (otp === result.otp) {
            let params_verified = {
              id: result.id,
              verified: true,
            };

            await OTPModel.update(
              { verified: params_verified.verified },
              { where: { id: params_verified.id } }
            );
            const clientResult = await UsersModel.findOne({
              where: { phone_number: check },
            });

            const payload = {
              id: clientResult.dataValues.id,
            };

            const tokens = jwt.generateTokens(payload);

            return res.status(200).send(tokens);
          } else {
            return ApiError.error(res, { friendlyMsg: "OTP NOT Matched" });
          }
        } else {
          return ApiError.error(res, { friendlyMsg: "OTP Expired" });
        }
      } else {
        return ApiError.error(res, { friendlyMsg: "OTP Already Used" });
      }
    } else {
      return ApiError.error(res, { friendlyMsg: "Bad Request" });
    }
  } catch (error) {
    return ApiError.internal(res, {
      message: error,
      friendlyMsg: "Server Error",
    });
  }
}

export { createUserAccount, verifyUserOtp };
