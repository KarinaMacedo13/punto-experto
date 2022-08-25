import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';
@Pipe({
  name: 'optionPipe',
})
export class OptionPipePipe implements PipeTransform {
  filterFinal!: any;
  // constructor(private firestoreservice: FirestoreService) {}
  transform(
    workers: WorkersData[],
    option: string,
    ubication: any
  ): WorkersData[] {
    if (option === 'experience') {
      const experienceArray = workers.sort(
        (a: any, b: any) => b.experience - a.experience
      );
      console.log('soy experienceArray', experienceArray);

      return experienceArray;
    }
    if (option === 'certificate') {
      const certificateArray = workers.sort(
        (a: any, b: any) => b.certificados.length - a.certificados.length
      );
      console.log('soy certificateArray', certificateArray);
      return certificateArray;
    }
    if (ubication != undefined) {
      const distritoUbicationLower = ubication.distrito.toLowerCase();
      console.log('soy la ubicacion en minuscula', distritoUbicationLower);
      const filterArequipa = workers.map((e) => ({
        object: e,
        area: e.areaWorker.map((e: any) => e.toLowerCase().split(',')).flat(),
      }));
      console.log('lowercase workers', filterArequipa);
      const filterUbication = filterArequipa.map((e: any) => {
        if (
          e.area.filter((e: any) => e.includes(distritoUbicationLower))
            .length != 0
        )
          return e.object;
      });
      this.filterFinal = filterUbication.filter((x) => x !== undefined);
      // if (this.filterFinal.length > 0) {
      //   this.firestoreservice.searchModal.emit({
      //     dataNumber: this.filterFinal.length,
      //   });
      // }
      console.log(this.filterFinal)
      return this.filterFinal;
    }
    return workers;
  }
}
