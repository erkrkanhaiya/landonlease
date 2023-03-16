var crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

class HelperClass {
  hash(text, algorithm = "sha256", enncoding = "hex") {
    var hash = crypto.createHash(algorithm).update(text).digest(enncoding);
    return hash;
  }

  async checkAuth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized request.",
        howToFix: "You forgot to send your authorization token.",
      });
    }

    if (authorization.indexOf("Bearer") !== 0) {
      return res.status(401).json({
        message: "Malformatted token.",
        howToFix: "Provide a valid authorization token.",
      });
    }

    const [, token] = authorization.split(" ");

    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      req.userId = decoded.id;
    } catch (err) {
      console.log("midlewares.auth", err.message);

      return res.status(401).json({
        message: "Invalid token.",
        howToFix: "Provide a valid authorization token.",
      });
    }

    return next();
  }
}

module.exports = HelperClass;
