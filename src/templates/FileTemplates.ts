export const FileTemplates = {
    fxmanifest: `fx_version 'cerulean'
game 'gta5'
lua54 'yes'
use_experimental_fxv2_oal 'yes'
author 'Your Name'
description 'Resource Description'
version '1.0.0'

client_scripts {
    'Modules/**/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'Modules/**/*.lua'
}

shared_scripts {
    '@ox_lib/init.lua',
    'Shared/**/*.lua'
}

ui_page 'Web/index.html'

files {
    'Web/index.html',
    'Web/css/ui.css',
    'Web/js/ui.js',
    'Web/Assets/**/*'
}`,

    clientLua: `-- Client-side code
local ResourceName = GetCurrentResourceName()

-- Initialize client-side resource
AddEventHandler('onClientResourceStart', function(resourceName)
    if resourceName ~= ResourceName then return end
    
    -- Your initialization code here
end)

-- Example event handler
RegisterNetEvent(ResourceName..':exampleEvent')
AddEventHandler(ResourceName..':exampleEvent', function(data)
    -- Handle event
end)`,

    serverLua: `-- Server-side code
local ResourceName = GetCurrentResourceName()

-- Initialize server-side resource
AddEventHandler('onResourceStart', function(resourceName)
    if resourceName ~= ResourceName then return end
    
    -- Your initialization code here
end)

-- Example event handler
RegisterNetEvent(ResourceName..':exampleEvent')
AddEventHandler(ResourceName..':exampleEvent', function(data)
    -- Handle event
end)`,

    sharedLua: `-- Shared code between client and server
local ResourceName = GetCurrentResourceName()

-- Add your shared functions and constants here
Config = {}
Config.Debug = false

-- Example shared function
function Config.LogDebug(message)
    if Config.Debug then
        print(string.format('[%s] %s', ResourceName, message))
    end
end`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FiveM Resource UI</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <!-- Your UI content here -->
    </div>
    <script src="script.js"></script>
</body>
</html>`,

    css: `/* Main styles */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    display: none;
    user-select: none;
}

#app {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Utility classes */
.hidden {
    display: none !important;
}`,

    js: `// Constants
const ResourceName = window.GetParentResourceName();

// State management
let isVisible = false;

// Event listeners
window.addEventListener('message', handleMessage);
document.addEventListener('DOMContentLoaded', initialize);

// Initialize the UI
function initialize() {
    setupEventListeners();
}

// Handle incoming NUI messages
function handleMessage(event) {
    const { type, data } = event.data;
    
    switch (type) {
        case 'show':
            showUI();
            break;
        case 'hide':
            hideUI();
            break;
        default:
            console.log(\`Unknown message type: \${type}\`);
    }
}

// UI visibility functions
function showUI() {
    document.body.style.display = 'block';
    isVisible = true;
}

function hideUI() {
    document.body.style.display = 'none';
    isVisible = false;
}

// Setup event listeners
function setupEventListeners() {
    // Example: Close UI on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isVisible) {
            sendToClient('close');
        }
    });
}

// Send data to client
function sendToClient(action, data = {}) {
    fetch(\`https://\${ResourceName}/\${action}\`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}`
};