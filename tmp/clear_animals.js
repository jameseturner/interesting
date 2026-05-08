const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'James', 'Desktop', 'cosmic-observer(3)', 'src', 'data', 'animals.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to match and clear species, habitat, description
content = content.replace(/("species":\s*")[^"]*(")/g, '$1$2');
content = content.replace(/("habitat":\s*")[^"]*(")/g, '$1$2');
content = content.replace(/("description":\s*")[^"]*(")/g, '$1$2');

fs.writeFileSync(filePath, content);
console.log("Successfully cleared species, habitat, and description for all animals.");
