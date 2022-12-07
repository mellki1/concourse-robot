const app = require('./services/sheetUpdateService');


exports.handler =  async function(event, context) {
    console.log('...::Iniciando processamento::...');
    await app.updateSheet();
}