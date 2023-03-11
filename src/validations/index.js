import Joi from "joi";

const userSignUpValidation = Joi.object({
  fullname: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z ]{2,40}$/))
    .message("Please enter only letters!"),

  username: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9_-]{3,20}$/))
    .message("use only letters, numbers and - or _"),

  phone_number: Joi.string()
    .pattern(new RegExp(/^998[389][012345789][0-9]{7}$/))
    .message("Phone number is invalid! Example phone number 998991234567"),
});

const userVerifyValidation = Joi.object({
  verification_key: Joi.string(),

  otp: Joi.string()
    .pattern(new RegExp(/^[0-9]{4}$/))
    .message("OTP is invalid"),

  check: Joi.string()
    .pattern(new RegExp(/^998[389][012345789][0-9]{7}$/))
    .message("Phone number is invalid! Example phone number 998991234567"),
});

export default { userSignUpValidation, userVerifyValidation };
