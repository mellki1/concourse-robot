const {GoogleSpreadsheet, GoogleSpreadsheetWorksheet} = require('google-spreadsheet');
const credentials = require('./../resources/googleCredentials.json');

module.exports = {
    async accessSpreadsheet() {
        console.log('...::Carregando planilha::...');
        const document = new GoogleSpreadsheet('1CwD1wEqlUAdmfvNOT4W2ZDNS2nVTjZyvkdzL_-c9cs0');
        await document.useServiceAccountAuth({
            client_email: credentials.client_email,
            private_key: credentials.private_key
        });
        await document.loadInfo();
        return await document.sheetsByIndex[0];
    }
}