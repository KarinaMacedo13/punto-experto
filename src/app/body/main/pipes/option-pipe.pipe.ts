import { Pipe, PipeTransform } from '@angular/core';
import { WorkersData } from 'src/app/shared/interfaces/worker';
@Pipe({
  name: 'optionPipe'
})
export class OptionPipePipe implements PipeTransform {

  transform(workers:WorkersData[] , option: string = ''): WorkersData[] {
    console.log("workers",workers)
    if(option==='experience'){
      const experienceArray = workers.sort((a:any, b:any) => b.experience - a.experience);
      console.log("soy experienceArray",experienceArray)
      return experienceArray;
    }
    if(option==='certificate'){
      const certificateArray = workers.sort((a:any, b:any) => b.certificados.length - a.certificados.length);
      console.log("soy certificateArray",certificateArray)
    }
    return workers;
  }

}
