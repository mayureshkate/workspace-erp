// src/services/gmailService.js
const { google } = require('googleapis');

/**
 * Creates a Gmail service client
 * @param {Object} auth - An authenticated OAuth2 client
 */
const getGmailClient = (auth) => {
  return google.gmail({ version: 'v1', auth });
};

/**
 * Send an email using Gmail API
 */
const sendEmail = async (auth, to, subject, body) => {
  const gmail = getGmailClient(auth);
  
  const message = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body,
  ].join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Read emails using Gmail API
 */
const readEmails = async (auth, maxResults = 10) => {
  const gmail = getGmailClient(auth);
  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
    });
    return res.data.messages || [];
  } catch (error) {
    console.error('Error reading emails:', error);
    throw error;
  }
};

module.exports = {
  getGmailClient,
  sendEmail,
  readEmails,
};
