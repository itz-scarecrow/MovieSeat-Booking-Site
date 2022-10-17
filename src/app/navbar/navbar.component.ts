import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class TopBarComponent implements OnInit {
  id1: boolean=true;
  id2:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
  setId0():void{
    this.id1=true;
    this.id2=false;
  }
  setId1():void{
    this.id2=true;
    this.id1=false;
  }
}
