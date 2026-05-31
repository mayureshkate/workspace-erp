// src/config/scopes.js

const SCOPES = {
  GMAIL: [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
  ],
  DRIVE: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly'
  ],
  PHOTOS: [
    'https://www.googleapis.com/auth/photoslibrary.readonly'
  ]
};

module.exports = SCOPES;
