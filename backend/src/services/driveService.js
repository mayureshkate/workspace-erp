// src/services/driveService.js
const { google } = require('googleapis');
const fs = require('fs');

/**
 * Creates a Drive service client
 * @param {Object} auth - An authenticated OAuth2 client
 */
const getDriveClient = (auth) => {
  return google.drive({ version: 'v3', auth });
};

/**
 * Upload a document to Google Drive
 */
const uploadDocument = async (auth, filePath, mimeType, fileName) => {
  const drive = getDriveClient(auth);
  
  try {
    const fileMetadata = {
      name: fileName,
    };
    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    };
    
    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

module.exports = {
  getDriveClient,
  uploadDocument,
};
