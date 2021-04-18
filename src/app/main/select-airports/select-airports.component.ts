import { Component, OnInit } from '@angular/core';
import { faHistory, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Airports, sortByCity } from 'src/app/models/airports';
import { ApiInterface } from 'src/app/models/ApiInterface';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-airports',
  templateUrl: './select-airports.component.html',
  styleUrls: ['./select-airports.component.sass']
})

export class SelectAirportsComponent implements OnInit  {

  faHistory = faHistory;
  faGlobeAfrica = faGlobeAfrica;

  airports: Airports[] = [];
  airportFrom!: Airports;
  airportTo!: Airports;
  airportFromLS!: Airports;
  airportToLS!: Airports;
  airportFromNow: string = "";
  airportToNow: string = "";

  inputFromString: string = "";
  inputToString: string = "";

  passengerNum:number = 1;
  adultNum:number = 1;
  childNum:number = 0;
  infantdNum:number = 0;

  isMax:boolean = false;
  passString!:string;
  classString!:string;

  dateFrom!:Date;
  dateTo!:Date;

  classType!:string;

  sendObject:ApiInterface = {
    fromAirport: "",
    toAirport: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    tickets: 0,
    class: ""
  }


  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    private router: Router
  ){
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
     this.allPassengers();
     this.classFunction("ECONOMY-CLASS");
    });
  }

  ngOnInit(): void {
    this.getAirports();
    this.allPassengers();
    this.classFunction("ECONOMY-CLASS");
  }
  getAirports(){
    this.airports = this.apiService.getAirportsList()
    this.airportFromLS = JSON.parse(localStorage.getItem("airportFrom")!);
    this.airportToLS = JSON.parse(localStorage.getItem("airportTo")!);
    this.airports.sort(sortByCity);
  }
  airportFromFunction(airport:Airports){
    this.airportFrom = airport;
    this.airportFromNow = this.airportFrom.abbr;
    this.inputFromString = `${airport.city} (${airport.abbr})`;
  }
  airportToFunction(airport:Airports){
    this.airportTo= airport;
    this.airportToNow = this.airportTo.abbr;
    this.inputToString = `${airport.city} (${airport.abbr})`;
  }
  lastSearch(){
    this.airportFrom = this.airportFromLS;
    this.airportTo = this.airportToLS;
    this.inputFromString = `${this.airportFrom.city} (${this.airportFrom.abbr})`;
    this.inputToString = `${this.airportTo.city} (${this.airportTo.abbr})`;
    this.airportFromNow = this.airportFrom.abbr;
    this.airportToNow = this.airportTo.abbr;
  }
  clear(info:string){
    if(info == "from") this.inputFromString = "";
    else this.inputToString = "";
    if(!this.inputFromString) this.airportFromNow = "";
    if(!this.inputToString) this.airportToNow = "";
  }
  allPassengers(){
    this.passengerNum = this.adultNum + this.childNum;
    this.passengerNum == 6 ? this.isMax = true : this.isMax = false;
    this.passengerNum == 1 ? this.passString = this.translate.instant('SELECT-AIRPORTS.PASSENGER') :
    this.passString = this.translate.instant('SELECT-AIRPORTS.PASSENGERS2');
  }
  adultFunction(num:number){
    this.adultNum += num;
    this.allPassengers();
  }
  childFunction(num:number){
    this.childNum += num;
    this.allPassengers();
  }
  infantFunction(num:number){
    this.infantdNum += num;
  }
  classFunction(s:string){
    this.classString = this.translate.instant(`SELECT-AIRPORTS.${s}`);
    this.classType = s;
  }
  calendarFrom(from:Date){
    this.dateFrom = from;
  }
  calendarTo(to:Date){
    this.dateTo = to;
  }
  buttonFunction(){
    if(this.dateFrom && this.dateTo && this.inputFromString && this.inputToString){
      this.sendObject.dateFrom = this.dateFrom;
      this.sendObject.dateTo = this.dateTo;
      this.sendObject.fromAirport = this.airportFrom.abbr;
      this.sendObject.toAirport = this.airportTo.abbr;
      this.sendObject.tickets = this.passengerNum;
      this.sendObject.class = this.classType;
      console.table(this.sendObject);
      localStorage.setItem('sendObject', JSON.stringify(this.sendObject));
      localStorage.setItem('airportFrom', JSON.stringify(this.airportFrom));
      localStorage.setItem('airportTo', JSON.stringify(this.airportTo));
      this.router.navigate(['/search']);
    }
  }
}
