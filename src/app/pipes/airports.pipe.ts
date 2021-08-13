import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airports'
})
export class AirportsPipe implements PipeTransform {


  public transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) return [];
    if (!keyword) return items;

    return items.filter(item => {
      return properties.find( p => item[p].toLowerCase().includes(keyword.toLowerCase()));
    })
  }
}
