import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormData } from '../Utilities/formData';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class TicketFormComponent implements OnInit {
  id: any;
  product: any;
  data: any;
  yourModel: number = -1;
  seats: number = 0;
  verify: boolean = true;
  data1: string = "";
  data2: string = "";
  data3: string = "";
  data4: string = "";
  data5: number=0;
  dummy: FormData = {
    movieId: '',
    name: '',
    email: '',
    mob: 0,
    dob: '',
    gender: '',
    timing: 0,
    seat: 0,
    totalPrice: 0,
    singlePrice: 0,
    seatAvl: 0,
    trailerUrl:"",
    movieName:"",
    imageUrl:"",
    seatArray:[],
    timingArray:["Morning","Noon","Evening"],
    scrTime:"",
    priceArray:[]
  };



  constructor(private router: Router) {
    this.product = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.product.data;
    console.log(this.data);
  }

  ngOnInit() {

  }

  onChange(event: any): void {
    this.yourModel = parseInt(event.target.value);
  }
  checkValidation(): boolean {
    if ((this.data1.length > 0 && this.data2.length > 0 && this.yourModel > -1 && this.data3.length > 0 && this.data4.length > 0 && this.verify && this.seats > 0 && this.seats < this.data.Seats[this.yourModel] + 1 && this.data5>0)) {
      this.dummy.movieId = this.data.id;
      this.dummy.name = this.data1;
      this.dummy.email = this.data2;
      this.dummy.mob = this.data5;
      this.dummy.dob = this.data4;
      this.dummy.gender = this.data3;
      this.dummy.timing = this.yourModel;
      this.dummy.seat = this.seats;
      this.dummy.seatAvl = this.data.Seats[this.yourModel] - this.seats;
      this.dummy.singlePrice = this.data.Price[this.yourModel];
      this.dummy.totalPrice = this.dummy.singlePrice * this.seats;
      this.dummy.trailerUrl = this.data.Trailer;
      this.dummy.movieName = this.data.Movie_name;
      this.dummy.imageUrl = this.data.Image;
      this.dummy.seatArray=this.data.Seats;
      this.dummy.scrTime= this.dummy.timingArray[this.yourModel];
      this.dummy.priceArray=this.data.Price;
    }
    return (this.data1.length > 0 && this.data2.length > 0 && this.yourModel > -1 && this.data3.length > 0 && this.data4.length >0 && this.verify && this.seats > 0 && this.seats < this.data.Seats[this.yourModel] + 1);
  }
}
