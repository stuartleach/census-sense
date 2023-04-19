import fs from 'fs';
import csv from 'csv-parser';

const filePath = 'path/to/your/csv-file.csv';

const data = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row: any) => {
    // Process and filter the data here based on your needs
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    // Use the data array for further processing
  });