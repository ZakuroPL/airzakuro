import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { faGlobeAfrica, faCaretDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Menu } from './enums/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  faGlobeAfrica = faGlobeAfrica;
  faCaretDown = faCaretDown;
  faTimes = faTimes;

  Menu = Menu;
  navEnum:Menu = Menu.Zero;

  m:string = '';
  languageName:string = '';

  isSearchModule:boolean = false;
//for SASS
  isShowMenuMain:boolean = false;
  isResizing:boolean = false;
  isMobile:boolean = false;

  constructor(
    public translate: TranslateService,
  ){
    translate.addLangs(['en', 'pl', 'zh']);
    // Simplified Chinese
    translate.setDefaultLang('en');
    this.defaultLanguage();
  }
  ngOnInit(): void {
  }
  @HostListener('window:resize')
  changeCalendar() {
    if(window.innerWidth <= 1000 && !this.isMobile){
      this.isMobile = true;
      this.m = '';
      this.navEnum = Menu.Zero
      this.isResizing = true;
      this.isShowMenuMain = false;
    }
    else if(window.innerWidth > 1000 && this.isMobile){
      this.isMobile = false;
      this.m = '';
      this.navEnum = Menu.Zero
      this.isResizing = true;
      this.isShowMenuMain = false;
    }
  }
  mouseEnter(m:string){
    if(window.innerWidth > 1000){
      this.m = m;
      if(!m) this.navEnum = Menu.Zero;
    }
 }
 topMenuClick(first:Menu, second:string){
  this.navEnum = first
  if(window.innerWidth > 1000){
    this.m = second
  }
 }
  defaultLanguage(){
   const local = localStorage.getItem('userLanguage');
   if(local) {
     this.translate.use(local);
     this.languageName = local;
   }
   else {
    const browserLang:string = this.translate.getBrowserLang();
    if (browserLang.match(/en|pl|zh/)){
      this.translate.use(browserLang);
      this.languageName = browserLang;
    }
    else{
      this.translate.use('en');
      this.languageName = 'en';
    }
   }
  }
  setUserLanguage(m:string){
    this.translate.use(m);
    this.languageName = m;
    localStorage.setItem('userLanguage', m);
    this.navEnum = Menu.Zero;
    m='';
    this.isShowMenuMain = false;
  }


}
