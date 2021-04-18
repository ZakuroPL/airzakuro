import { Injectable } from '@angular/core';
import { Airports } from '../models/airports';


@Injectable()
export class ApiService {

  //list of localStorage elements:
  //airportList
  //airportFrom
  //airportTo


  airports:Airports[] = [
    {
      city: "Warsaw",
      country: "Poland",
      name: "Warsaw Frédéric Chopin Airport",
      abbr: "WAW"
    },
    {
      city: "London",
      country: "United Kingdom",
      name: "London Heathrow Airport",
      abbr: "LHR"
    },
    {
      city: "Berlin",
      country: "Germany",
      name: "Berlin Brandenburg International Airport",
      abbr: "BER"
    },
    {
      city: "Dublin",
      country: "Ireland",
      name: "Dublin Airport",
      abbr: "DUB"
    },
    {
      city: "Paris",
      country: "France",
      name: "Charles De Gaulle Airport",
      abbr: "CDG"
    },
    {
      city: "Cork",
      country: "Ireland",
      name: "Cork Airport",
      abbr: "ORK"
    },
    {
      city: "Manchester",
      country: "United Kingdom",
      name: "Manchester international Airport",
      abbr: "MAN"
    },
    {
      city: "Gdansk",
      country: "Poland",
      name: "lech Wałęsa Airport",
      abbr: "GDN"
    },
  ];

  constructor() { }

  getAirportsList(){
    const airports = localStorage.getItem("airportsList");
    if (airports){
      this.airports = JSON.parse(airports);
      return this.airports
    }
    else {
      localStorage.setItem("airportsList", JSON.stringify(this.airports));
      return this.airports
    }
  }
}


