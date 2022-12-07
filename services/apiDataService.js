const axios = require('axios');


var config = {
  method: 'get',
  url: 'https://www.sanarsaude.com/portal/api/concourses',
  params: {
    page : 1,
    status : 'ABERTO',
    profession : 4,
  },
  headers: { 
    'authority': 'www.sanarsaude.com', 
    'accept': '*/*', 
    'Cookie': 'AWSALB=80PZCZIhOfIoRmUveLhUvHmb2vKbFjetzZUE0uizOPf37sTMg6cWjvE5/d9OkpbTh0RFWlZpeHSIBSQwq4VSf4PXGaJIOoWQFS6BgwzA//qNS8EsROT8Gpb6fJpE; AWSALBCORS=80PZCZIhOfIoRmUveLhUvHmb2vKbFjetzZUE0uizOPf37sTMg6cWjvE5/d9OkpbTh0RFWlZpeHSIBSQwq4VSf4PXGaJIOoWQFS6BgwzA//qNS8EsROT8Gpb6fJpE'
  }
};


function responseStructure(data) {
  return {
      'Local' : data.institution,
      'Data de inicio da inscrição' : data.startDate,
      'Data de fim da inscrição' : data.endDate,
      'Data da prova' : data.examDate,
      'Quantidade de vagas' : data.amountVacancies,
      'Banca' : data.board,
      'Salario' : `R$ ${data.wage}`,
      'Edital' : data.editalLink,
    }
};

module.exports = {
  async loadApiData() {
    return await axios(config).then(
      async function (response) {
        await console.log('...::Buscando dados da API::...');
        var responseObject = await JSON.parse(JSON.stringify(response.data));
        var allCouncourses = [];
        responseObject.concourses.forEach(concourse => {
          allCouncourses.push(responseStructure(concourse));
        });
        const totalPages = responseObject.apiTotalPages;
      
        var index = 2;
        while(index <= totalPages) {
          config.params.page = index;    
          await axios(config)
          .then(async function (res) {
            responseObject = await JSON.parse(JSON.stringify(res.data));
            await responseObject.concourses.forEach(concourse => {
              const exists = allCouncourses.find(c => c.Local === concourse.institution);
              if(!exists)
                allCouncourses.push(responseStructure(concourse));  
            });
          });
          index++;
        }
        return await allCouncourses;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};