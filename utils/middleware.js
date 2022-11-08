// setup the logger
const requestDateTimeNow = (req, res, next) => {
    const dateIns = new Date();
    const dateNow =
        dateIns.getDate() + "/" +
        (dateIns.getMonth() + 1) + "/" +
        dateIns.getFullYear() + " @ " +
        dateIns.getHours() + ":" +
        dateIns.getMinutes() + ":" +
        dateIns.getSeconds();
    req.requestDateTime = dateNow;
    console.log(req.url, "...requested -", dateNow);
    next();
};

module.exports = { requestDateTimeNow };