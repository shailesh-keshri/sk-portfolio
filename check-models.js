const fs = require('fs');

async function listModels() {
  try {
    // Read the API key manually from the .env file
    const envFile = fs.readFileSync('.env', 'utf-8');
    const apiKeyLine = envFile.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
    const apiKey = apiKeyLine ? apiKeyLine.split('=')[1].trim() : null;

    if (!apiKey) {
      console.log('❌ Could not find GEMINI_API_KEY in your .env file.');
      return;
    }

    console.log('🔑 Found API Key. Fetching available models from Google...\n');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.log('❌ Error from Google:', data.error.message);
      return;
    }

    console.log('✅ Your API Key has access to the following models:');
    console.log('--------------------------------------------------');
    
    // Filter to show only Gemini models (ignoring older PaLM models)
    const geminiModels = data.models.filter(m => m.name.includes('gemini'));
    
    geminiModels.forEach(m => {
      console.log(`- Model Name:  ${m.name}`);
      console.log(`  Description: ${m.description}`);
      console.log(`  Supported Methods: ${m.supportedGenerationMethods.join(', ')}`);
      console.log('');
    });

  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
}

listModels();
