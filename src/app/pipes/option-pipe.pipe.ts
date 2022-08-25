import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionPipe'
})
export class OptionPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
