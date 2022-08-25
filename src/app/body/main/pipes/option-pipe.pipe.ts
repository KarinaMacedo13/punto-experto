import { Pipe, PipeTransform } from '@angular/core';
import { WorkersData } from 'src/app/shared/interfaces/worker';
@Pipe({
  name: 'optionPipe'
})
export class OptionPipePipe implements PipeTransform {

  transform(workers:WorkersData[] , option: string,ubication:any): WorkersData[] {
    console.log(ubication.map((e:any)=>e.distrito),'soy la ubicacion');
    const filterArequipa = workers.map(e=>e.areaWorker.forEach(e=>e==='Arequipa'))
    console.log("workers",filterArequipa)
    if(option==='experience'){
      const experienceArray = workers.sort((a:any, b:any) => b.experience - a.experience);
      console.log("soy experienceArray",experienceArray)
      return experienceArray;
    }
    if(option==='certificate'){
      const certificateArray = workers.sort((a:any, b:any) => b.certificados.length - a.certificados.length);
      console.log("soy certificateArray",certificateArray)
    }
    if(ubication.length>0){
      const distritoUbication = ubication.map((e:any)=>e.distrito)[0]
      console.log('pipes',distritoUbication)
      const filterUbication = workers.filter(e=>e.areaWorker.find(e=>e===distritoUbication))
      console.log("soy filterUbication",filterUbication);
      return filterUbication;
    }
    return workers;
  }

}
