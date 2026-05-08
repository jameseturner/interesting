import fs from 'fs';

const filePath = 'c:/Users/James/Desktop/cosmic-observer(3)/src/data/animals.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// A more robust regex to find each object in the array and add funFact before the closing brace
// Find each object in the form { ... "locations": [ ... ] } and add "funFact": "" if it doesn't have it
const animalsArrayMatch = content.match(/export const ANIMALS: Animal\[\] = \[\s*([\s\S]*)\s*\];/);
if (animalsArrayMatch) {
    let animalsBody = animalsArrayMatch[1];
    
    // Split by objects and add the field
    // This is tricky because objects can contain arrays.
    // We can look for the closing brace of each animal object.
    // Each animal object ends with a closing brace followed by a comma or the end of the array.
    
    // Better: use a state machine or just a simple replacement for the ending of each animal block.
    // We know each animal ends with "    ]" for the locations and then a space and a "}". 
    // And there's usually a comma or a newline.
    
    // Let's replace the closing brace of each object.
    animalsBody = animalsBody.replace(/(\n\s*)(\}\s*,?\s*\n(\s*\{|\s*\]))/g, (match, p1, p2) => {
        if (!match.includes('"funFact"')) {
            return `${p1}  "funFact": ""\n  ${p2}`;
        }
        return match;
    });
    
    // Handle the last animal object
    animalsBody = animalsBody.replace(/(\n\s*)(\}\s*\n\s*$)/g, (match, p1, p2) => {
        if (!match.includes('"funFact"')) {
            return `${p1}  "funFact": ""\n  ${p2}`;
        }
        return match;
    });

    content = content.replace(animalsArrayMatch[1], animalsBody);
}

// Update the African Bush Elephant specifically
content = content.replace('"name": "African Bush Elephant",', (match) => {
    // Look for the next funFact and replace it
    return match;
});

// Let's just do a simpler search and replace for the elephant
const elephantSearch = /("name": "African Bush Elephant",[\s\S]*?"funFact": )""/;
content = content.replace(elephantSearch, '$1"Despite their thick skin, elephants are sensitive to sunburn and insect bites. They use mud and sand to protect themselves from the sun\'s rays!"');

fs.writeFileSync(filePath, content);
console.log('Successfully updated animals.ts');
