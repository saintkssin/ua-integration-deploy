const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

function env(name, fallback = '') {
    return (process.env[name] || fallback).trim();
}

const PLACEHOLDERS = {
    PIPEDRIVE_API_TOKEN:      env('PIPEDRIVE_API_TOKEN'),
    PIPEDRIVE_DOMAIN:         env('PIPEDRIVE_DOMAIN'),
    PIPEDRIVE_PIPELINE_ID:    env('PIPEDRIVE_PIPELINE_ID', 'null'),
    PIPEDRIVE_KEY_POS_SYSTEM: env('PIPEDRIVE_KEY_POS_SYSTEM'),
    PIPEDRIVE_ID_GLOBAL:      env('PIPEDRIVE_ID_GLOBAL'),
    PIPEDRIVE_ID_NEW_1:       env('PIPEDRIVE_ID_NEW_1'),
    PIPEDRIVE_ID_NEW_2:       env('PIPEDRIVE_ID_NEW_2'),
    PIPEDRIVE_ID_OLD:         env('PIPEDRIVE_ID_OLD'),
    GOOGLE_CLIENT_ID:         env('GOOGLE_CLIENT_ID'),
};

for (const [k, v] of Object.entries(PLACEHOLDERS)) {
    if (v === '' || v === 'null') {
        console.warn(`[server] Missing env var: ${k}`);
    } else {
        console.log(`[server] ${k} = "${v.slice(0, 4)}..." (${v.length} chars)`);
    }
}

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
