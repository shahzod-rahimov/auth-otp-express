export default class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static error(res, errorMessage) {
    return res.status(400).send({
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static unauthorized(res, errorMessage) {
    return res.status(401).send({
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }

  static forbidden(res, errorMessage) {
    return res.status(403).send({
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }

  static notFound(res, errorMessage) {
    return res.status(404).send({
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }

  static internal(res, errorMessage) {
    console.log(errorMessage.message);
    return res.status(401).send({
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
}
