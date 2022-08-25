import { Pipe, PipeTransform } from '@angular/core';
import { WorkersData } from 'src/app/shared/interfaces/worker';
@Pipe({
  name: 'optionPipe'
})
export class OptionPipePipe implements PipeTransform {

  transform(workers:WorkersData[] , option: string, ubication:any): WorkersData[] {
    
    // const distritoUbication = ubication.forEach((e:any)=>e.distrito)
      // console.log('soy la ubicacion que envio', distritoUbication);
    
    
    // console.log("soy del trabajador",filterArequipa)
    if(option==='experience'){
      const experienceArray = workers.sort((a:any, b:any) => b.experience - a.experience);
      console.log("soy experienceArray",experienceArray)
      return experienceArray;
    }
    if(option==='certificate'){
      const certificateArray = workers.sort((a:any, b:any) => b.certificados.length - a.certificados.length);
      console.log("soy certificateArray",certificateArray)
    }
    if(ubication!=undefined){
      const distritoUbication = ubication.distrito.charAt(0).toUpperCase()+ubication.distrito.slice(1,ubication.distrito.length).toLowerCase();
      const distritoUbicationLower = ubication.distrito.toLowerCase();
      console.log('soy la ubicacion en minuscula',distritoUbicationLower);
      // const filterArequipa = workers.map(e=>e.areaWorker.map((e:any)=>e.toLowerCase().split(","))).flat();
      const filterArequipa = workers.map(e=>e.areaWorker.map((e:any)=>e.toLowerCase().split(","))).flat();
      console.log('lowercase workers',filterArequipa)

      // const newArray = workers.map((e:any)=>e.areaWorker.map((e:any)=>e=filterArequipa))
      // console.log(newArray);

      // const filterUbication = filterArequipa.filter((e:any)=>e[2].includes(distritoUbicationLower)?e:'')
      const filterUbication = filterArequipa.filter((e:any)=>e[2].includes(distritoUbicationLower))
      console.log('soy workers', filterUbication);
      // const filterUbication = workers.filter(e=>e.areaWorker.map(e=>e.search(distritoUbication)))
      // const filterUbication = filterArequipa.filter(e=>e.areaWorker.find((e:any)=>e==distritoUbicationLower))
      // console.log("soy filterUbication",filterUbication);
      // return filterUbication;
    }
    // if(ubication.length>0){
    //   // const distritoUbication = ubication.map((e:any)=>e.distrito)[0]
    //   // console.log('pipes',distritoUbication)
    //
    // }
    return workers;
  }

}
