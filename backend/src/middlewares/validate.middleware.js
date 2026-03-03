// src/middlewares/validate.middleware.js
import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    // Safely assign only if defined
    if (parsed.body) {
      req.body = parsed.body;
    }

    if (parsed.params) {
      Object.assign(req.params, parsed.params);
    }

    if (parsed.query) {
      Object.assign(req.query, parsed.query);
    }

    next();
  } catch (error) {
    if (error.name === "ZodError") {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return next(
        new ApiError(400, "Validation failed", true, formattedErrors)
      );
    }

    next(error);
  }
};

export default validate;