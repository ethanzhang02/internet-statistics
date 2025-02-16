const API_KEY = process.env.API_KEY;

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Get API key from request headers

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }

  next(); // Proceed to the next middleware/route handler
};

module.exports = apiKeyAuth;