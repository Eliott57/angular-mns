import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: number[]): unknown {
    if(!value) return '';

    const truncatedValue = value.substring(0,args[0]);

    if(truncatedValue.length === value.length){
      return truncatedValue;
    }

    return `${value.substring(0,args[0])}...`;
  }

}
