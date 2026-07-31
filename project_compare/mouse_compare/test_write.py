// Test file to check if WriteTool works
console.log('Test file created successfully');

const testData = {
  test: 'value',
  timestamp: new Date().toISOString()
};

console.log('Data:', testData);

// Save to a temporary file to verify
const fs = require('fs');
fs.writeFileSync('/tmp/test_output.txt', 'Test write successful');