import re

with open(r'c:\Users\James\Desktop\cosmic-observer(3)\src\data\animals.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Clear species
content = re.sub(r'("species":\s*")[^"]*(")', r'\1\2', content)

# Clear habitat
content = re.sub(r'("habitat":\s*")[^"]*(")', r'\1\2', content)

# Clear description
content = re.sub(r'("description":\s*")[^"]*(")', r'\1\2', content)

with open(r'c:\Users\James\Desktop\cosmic-observer(3)\src\data\animals.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully cleared species, habitat, and description for all animals.")
