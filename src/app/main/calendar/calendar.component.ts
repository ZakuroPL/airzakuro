import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Output() finalFromDate = new EventEmitter<Date>();
  @Output() finalToDate = new EventEmitter<Date>();

  daysOfWeeks!:string[];
  namesOfMonths!:string[];
  daysOfMonth!:number[];
  prevDays!:number[];
  nextDays!:number[];
  selectedMonth:number = new Date().getMonth();
  selectedYear:number = new Date().getFullYear();
  nameOfMonth!:string;

  clickedFullDate!:Date;
  todayDay:number = new Date().getDate();
  todayMonth:number = this.selectedMonth;
  todayYear:number = this.selectedYear;

  selectedMonthPrev:number = 0;
  selectedYearPrev:number = 0;
  selectedMonthNext:number = 0;
  selectedYearNext:number = 0;

  sunday1!:number;
  sunday2!:number;
  sunday3!:number;
  sunday4!:number;
  sunday5!:number;
  sundayAfter!:number;
  sundayAfter2!:number;

  isFirst:boolean = false;
  firstDate!: Date;
  secondDate!: Date;
  fD!: number;
  fM!: number;
  fY!: number;
  sD!: number;
  sM!: number;
  sY!: number;

  clickNum:number = 0;

    constructor(
      public translate: TranslateService,
    ) {
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.changeLanguage();
        this.nameForSelectedMonth();
      })
    }

    ngOnInit(): void {
      this.changeLanguage();
      this.getDaysOfMonth();
      this.nameForSelectedMonth();
      const date:Date = new Date(this.selectedYear, this.selectedMonth, 1);
      this.getPrevNext(date);
    }
    changeLanguage(){
      this.daysOfWeeks = [
        this.translate.instant('CALENDAR.MON'),
        this.translate.instant('CALENDAR.TUE'),
        this.translate.instant('CALENDAR.WED'),
        this.translate.instant('CALENDAR.THU'),
        this.translate.instant('CALENDAR.FRI'),
        this.translate.instant('CALENDAR.SAT'),
        this.translate.instant('CALENDAR.SUN')
      ];
      this.namesOfMonths = [
        this.translate.instant('CALENDAR.JANUARY'),
        this.translate.instant('CALENDAR.FEBRUARY'),
        this.translate.instant('CALENDAR.MARCH'),
        this.translate.instant('CALENDAR.APRIL'),
        this.translate.instant('CALENDAR.MAY'),
        this.translate.instant('CALENDAR.JUNE'),
        this.translate.instant('CALENDAR.JULY'),
        this.translate.instant('CALENDAR.AUGUST'),
        this.translate.instant('CALENDAR.SEPTEMBER'),
        this.translate.instant('CALENDAR.OCTOBER'),
        this.translate.instant('CALENDAR.NOVEMBER'),
        this.translate.instant('CALENDAR.DECEMBER'),
      ];
    }

    getDaysOfMonth(){
      this.daysOfMonth = [];
      this.prevDays = [];
      this.nextDays = [];
      const numbertodayMonth:number = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
      let numberPrevMonth:number = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      const daysBefore:number = new Date(this.selectedYear, this.selectedMonth, 0).getDay();
      const daysAfter:number = new Date(this.selectedYear, this.selectedMonth + 1, 1).getDay();
      let i:number = 0;
      let next:number = 0;
      while(this.prevDays.length < daysBefore){
        this.prevDays.push(numberPrevMonth);
        numberPrevMonth--;
      }
      this.prevDays.sort((a,b) =>{
        return a-b;
      });
      while (this.daysOfMonth.length < numbertodayMonth){
        i++;
        this.daysOfMonth.push(i);
      }
      while (this.nextDays.length < 8 - daysAfter && daysAfter != 1){
        next++;
        this.nextDays.push(next);
      }
      this.sunday1 = 7 - daysBefore;
      this.sunday2 = this.sunday1 + 7;
      this.sunday3 = this.sunday2 + 7;
      this.sunday4 = this.sunday3 + 7;
      this.sunday5 = this.sunday4 + 7;
      this.sundayAfter = 8 - daysAfter;
      this.sundayAfter == 8 ? this.sundayAfter2 = 1 : this.sundayAfter2 = 0;
    }
    nameForSelectedMonth(){
      this.nameOfMonth = this.namesOfMonths[this.selectedMonth];
    }
    minus(){
      if(this.clickNum > 0){
        this.clickNum--;
        const date:Date = new Date(this.selectedYear, this.selectedMonth - 1, 1)
        this.selectedMonth = date.getMonth();
        this.selectedYear = date.getFullYear();

        this.getPrevNext(date);
        this.nameForSelectedMonth();
        this.getDaysOfMonth();
      }
    }
    plus(){
      if(this.clickNum < 11){
        this.clickNum++;
        const date:Date = new Date(this.selectedYear, this.selectedMonth + 1, 1)
        this.selectedMonth = date.getMonth();
        this.selectedYear = date.getFullYear();

        this.getPrevNext(date);
        this.nameForSelectedMonth();
        this.getDaysOfMonth();
      }
    }
    getDay(day:number){
      this.clickedFullDate = new Date(this.selectedYear, this.selectedMonth, day);
      this.selectDate();
    }
    getDayBefore(day:number){
      this.clickedFullDate = new Date(this.selectedYear, this.selectedMonth - 1, day);
      this.selectDate();
    }
    getDayNext(day:number){
      this.clickedFullDate = new Date(this.selectedYear, this.selectedMonth + 1, day);
      this.selectDate();
    }
    getPrevNext(date:Date){
      const prevDate:Date = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      this.selectedMonthPrev = prevDate.getMonth();
      this.selectedYearPrev = prevDate.getFullYear();
      const nextDate:Date = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      this.selectedMonthNext = nextDate.getMonth();
      this.selectedYearNext = nextDate.getFullYear();
    }
    selectDate(){
      if(this.clickedFullDate >= new Date()){
        this.isFirst = !this.isFirst;
        if(!this.isFirst && this.clickedFullDate > this.firstDate) {
          this.secondDate = this.clickedFullDate;
          this.sD = this.secondDate.getDate()
          this.sM = this.secondDate.getMonth();
          this.sY = this.secondDate.getFullYear();
        }
        else {
          this.firstDate = this.clickedFullDate;
          this.fD = this.firstDate.getDate()
          this.fM = this.firstDate.getMonth();
          this.fY = this.firstDate.getFullYear();
        }
        if(this.firstDate > this.secondDate || this.clickedFullDate < this.secondDate){
          this.secondDate = this.firstDate;
          this.isFirst = true;
          this.sD = this.secondDate.getDate()
          this.sM = this.secondDate.getMonth();
          this.sY = this.secondDate.getFullYear();
          this.fD = this.firstDate.getDate()
          this.fM = this.firstDate.getMonth();
          this.fY = this.firstDate.getFullYear();
        }
        if(!this.isFirst){
          this.ToParent();
        }
      }
    }
    ToParent(){
      this.finalFromDate.emit(this.firstDate);
      this.finalToDate.emit(this.secondDate);
    }
}
