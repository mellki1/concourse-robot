const apiDataService = require('./apiDataService');
const googleConnectionService = require('./googleConnectionService');


module.exports = {
    async updateSheet() {
        const document = await googleConnectionService.accessSpreadsheet();
        const data = await apiDataService.loadApiData();
        await console.log('...::Limpando planilha::...');
        await document.clearRows();
        await console.log('...::Atualizando planilha::...');
        await document.addRows(data);
    }
};