#!/bin/bash

# Ensure the src directory exists before running
if [ ! -d "src/" ]; then
  echo "Error: Directory 'src/' not found."
  exit 1
fi

echo -e "Lines\tFile"
echo "------------------------"

# Initialize our running total
total=0

# Use process substitution to feed find's output into the loop
while IFS= read -r -d '' file; do
    # Count non-empty lines
    count=$(grep -cv '^[[:space:]]*$' "$file")
    
    # Print the individual file count
    echo -e "${count}\t${file}"
    
    # Add to the running total
    total=$((total + count))
    
done < <(find src/ -type f -name "*.js" -print0)

# Print the grand total at the end
echo "------------------------"
echo -e "${total}\tTOTAL"