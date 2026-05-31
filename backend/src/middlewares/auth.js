const { OAuth2Client } = require('google-auth-library');

// Note: Ensure dotenv is configured in your main entry point
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * Middleware to verify Google OAuth token and handle token exchange/refresh
 */
const authenticateGoogle = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the ID token using google-auth-library
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // Attach user info to request
    req.user = {
      id: userid,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };

    next();
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Utility to exchange authorization code for tokens
 */
const exchangeAuthCode = async (code) => {
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    throw new Error('Failed to exchange authorization code');
  }
};

/**
 * Utility to refresh access token using a refresh token
 */
const refreshAccessToken = async (refreshToken) => {
  try {
    client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await client.refreshAccessToken();
    return credentials;
  } catch (error) {
    throw new Error('Failed to refresh access token');
  }
};

module.exports = {
  client,
  authenticateGoogle,
  exchangeAuthCode,
  refreshAccessToken
};
