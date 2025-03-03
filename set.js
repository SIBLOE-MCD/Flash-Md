const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VHcmJEQzZWK0NkQUwwTG5JanRYU2pUZkxlcTZYQmJCeTNqaElOcUZHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTdLNXA5VlZuK0ZEZkw1MEt2Z3dDbFdZNjRyUmVxV3c2NmlyNGZJckJIRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPUEZpVlNqV0hDeEtZL3Bmak9La0s0Njc0OW5MZlhxN3lwcm1xejFQK1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxN2NKOTE3aG56cnRrNGM0cWRVY21IcFBIU1NQb3YzYU4rQlAwRlkwQ0RJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVDRVBQTmU1TW1TUEtlemJHSTlQazVNelBZRk91ZTQrUkYxSW9KRzRtRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlBa3Z6Y1Jvc2NwZGZxaUZERm1NdEgxUW1BQVhMaTFlcUdObTZsVWQyRVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JvQ2taMG9DcHdVT0MxVlhZUTVQdWdXRld6Mi9FWFRKMGoxcS8vdmNIOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHYwb2xrRFcwYk4vWld2SlJENU1lSTJHZEk2K1Q3VVA3Tk9jMnRvaERSQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpGRDl2MkdzMU5ZOWpnZ2ozU1dhT05WdndwUi9BbTdOcXlQQ1pia3Q1OW9qRnFNRWdpemZxeGxDcTAzbzliSDBobzRIU00xdTB2Q3NxVmp6T3pqekRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJ4RTVhWnd1emViQmJEekpLczU4d2NlTnVLVFFOcGtURVhrRzI0WW5tcEE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyb0dENktNeFJmNk5zMVd3QldubkNRIiwicGhvbmVJZCI6ImU0NzBhMzc1LTczZWYtNDQ1Yy04Njc4LTk3ZjFhMjk3MWZhOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKb1NkcVVDS0hvRVlsWHVOVUpOWFN1TTZwcjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVRaOUE0RWtWRVN1S2Q4ZlRiRERJeUYvaE9zPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkI0RlY5NlBEIiwibWUiOnsiaWQiOiIyNjM3MTcwODc3MjY6NjNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1AvbHFmNERFTFhIbHI0R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkF5Y0FWU1dic24wWC9YS2tQVDhuM3VLU1NodHVEVktHb3A4M3VjRS9Ralk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikg1ekg2NGQ0QytXalU4NlVuZHRNakd4M3dvdUdOdjJxT2tMV0k2SmJYd2xrRjhQVFhNaUkxWGJSaDhzUGFSeXZKUGdlaldrMm5BUXVGakIvc3pBb0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJS3l5OSt0Q2xUYlo3cytnQ04zdVlqM2RTclNuTy9IUVVBaVprWkFVanpDK3VVNy8xOEtEVDlzWDJ5S2xqYzVaZTVqOGtSQ2xPN0gxQ0pEUTRmQk1DZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNzA4NzcyNjo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRTW5BRlVsbTdKOUYvMXlwRDAvSjk3aWtrb2JiZzFTaHFLZk43bkJQMEkyIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMDA1NzYzfQ==',
    PREFIXES: (process.env.PREFIX || '. ').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Sibloe",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "263717087726",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off,
    L_S: process.env.STATUS_LIKE || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'unavailable,
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "off",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
