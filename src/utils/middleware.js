// ts-check

/**
 * @module Utils
 */
/**
 * @description This Middleware sets the value of the 'requestDateTime' parameter of the request object the current DataTime in an appropriate format.
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Callback} next
 * @returns {void}
 */
const requestDateTimeNow = (req, res, next) => {
  const dateIns = new Date();
  const dateNow =
    dateIns.getDate() +
    "/" +
    (dateIns.getMonth() + 1) +
    "/" +
    dateIns.getFullYear() +
    " @ " +
    dateIns.getHours() +
    ":" +
    dateIns.getMinutes() +
    ":" +
    dateIns.getSeconds();
  req.requestDateTime = dateNow;
  console.log(req.url, "...requested -", dateNow);
  next();
};

module.exports = { requestDateTimeNow };
