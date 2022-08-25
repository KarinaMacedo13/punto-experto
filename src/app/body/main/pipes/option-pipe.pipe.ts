import { Pipe, PipeTransform } from '@angular/core';
import { WorkersData } from 'src/app/shared/interfaces/worker';
@Pipe({
  name: 'optionPipe'
})
export class OptionPipePipe implements PipeTransform {

  transform(workers:WorkersData[] , option: string = '',ubication:any={}): WorkersData[] {
    console.log('pipes',ubication)
    // console.log("workers",workers.map(e=>e.areaWorker))
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
      const filterUbication = workers.filter((elem) =>elem.areaWorker.map(elem =>elem==ubication.distrito));
      console.log("soy filterUbication",filterUbication);
      return filterUbication;
    }
    return workers;
  }

}
