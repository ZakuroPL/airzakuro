import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInterface } from 'src/app/models/ApiInterface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  obj!:ApiInterface;

  ngOnInit(): void {
    this.obj = JSON.parse(localStorage.getItem("sendObject")!);
  }

}
