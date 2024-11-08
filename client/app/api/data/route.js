// app/api/data/route.js
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const dataFolderPath = path.join(process.cwd(),'data');
    console.log("Data Folder Path:", dataFolderPath);

    // Ensure each file exists and read its content
    const tokenAddress = fs.readFileSync(path.join(dataFolderPath, 'tokenAddress.txt'), 'utf8');
    const solidityCode = fs.readFileSync(path.join(dataFolderPath, 'solidityCode.txt'), 'utf8');
    const deploy = fs.readFileSync(path.join(dataFolderPath, 'deploy.txt'), 'utf8');
    const dependencyModule = fs.readFileSync(path.join(dataFolderPath, 'dependencyModule.txt'), 'utf8');

    return new Response(
      JSON.stringify({ tokenAddress, solidityCode, deploy, dependencyModule }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error reading files:', error);
    return new Response(JSON.stringify({ error: 'Failed to read files' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

