export interface Airports {
    // assign(arg0: {}):Airports;
    city: string,
    country: string,
    name: string,
    abbr: string
}
export function sortByCity(a:Airports, b:Airports){
  return a.city.localeCompare(b.name);
}
