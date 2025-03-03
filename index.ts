import * as minimist from "minimist";
import { PelisController } from "./controllers";
// parametros: add - get - search - {nada} -

// si tiene add tiene id - title - tags
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

function parseaParams(argv) {
  const resultado = minimist(argv);
  let peticion;
  if(resultado._[0] == undefined){
    peticion = "all"
    return [undefined,peticion]
  }else{
    peticion = resultado._[0].toLowerCase();
  }

  if (peticion == "add") {
    const optionAdd = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    return [optionAdd, peticion];
  }

  if (peticion == "get" || peticion == "search") {
    const options: Options = {
      id: resultado.id,
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
    };

    

    return [options, peticion];
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const option = params[0];
  const peticion = params[1];

 

  const controller = new PelisController();

  if (peticion == "add") {
    controller.add(option).then((res) => console.log(res));
  }
  if (peticion == "get" || peticion == "search") {
    controller.get(option).then((res) => console.log(res));
  }
  if(peticion == "all"){
    controller.get(option).then((res) => console.log(res));
  }

}

main();
