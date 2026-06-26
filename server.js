const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const PLACEHOLDERS = {
    PIPEDRIVE_API_TOKEN:      process.env.PIPEDRIVE_API_TOKEN      || '',
    PIPEDRIVE_DOMAIN:         process.env.PIPEDRIVE_DOMAIN         || '',
    PIPEDRIVE_PIPELINE_ID:    process.env.PIPEDRIVE_PIPELINE_ID    || '',
    PIPEDRIVE_KEY_POS_SYSTEM: process.env.PIPEDRIVE_KEY_POS_SYSTEM || '',
    PIPEDRIVE_ID_GLOBAL:      process.env.PIPEDRIVE_ID_GLOBAL      || '',
    PIPEDRIVE_ID_NEW_1:       process.env.PIPEDRIVE_ID_NEW_1       || '',
    PIPEDRIVE_ID_NEW_2:       process.env.PIPEDRIVE_ID_NEW_2       || '',
    PIPEDRIVE_ID_OLD:         process.env.PIPEDRIVE_ID_OLD         || '',
    GOOGLE_CLIENT_ID:         process.env.GOOGLE_CLIENT_ID         || '',
};

function renderTemplate(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [key, value] of Object.entries(PLACEHOLDERS)) {
        content = content.replaceAll(`{{${key}}}`, value);
    }
    return content;
}

app.get('/', (req, res) => {
    res.type('html').send(renderTemplate(path.join(__dirname, 'dashboard.html')));
});

app.get('/dashboard.html', (req, res) => {
    res.type('html').send(renderTemplate(path.join(__dirname, 'dashboard.html')));
});

app.get('/manager.html', (req, res) => {
    res.type('html').send(renderTemplate(path.join(__dirname, 'manager.html')));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
