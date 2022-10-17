import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataPostService } from '../services/customer.service';
import { GetMoviesService } from '../services/getMovies.service';
import { UserData, UserColumns } from '../Utilities/userData';


/**
 * @title Table with selection
 */
interface time {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<any>();
  currSeats: number = 0;
  movieUserData: any;
  movieId: string = "";
  userId: string = "";
  index: number = 0;
  index1: number = 0;
  seatArr: any;
  putBody: any;
  selectTime: any;
  changeId: string = "";
  useId: number = 0;
  constructor(private customerService: DataPostService, private movieService: GetMoviesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerService.getCustomerData().subscribe((data: any) => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    });
  }
  times: time[] = [
    { value: 0, viewValue: 'Morning' },
    { value: 1, viewValue: 'Noon' },
    { value: 2, viewValue: 'Evening' },
  ];
  selectedTime(event: Event, element: any) {
    this.index1 = parseInt((event.target as HTMLSelectElement).value);
    this.changeId = element.id;
    console.log(this.changeId);
    this.dataSource.data[parseInt(this.changeId) - 1].timing = this.index;
    this.dataSource.data[parseInt(this.changeId) - 1].scrTime = this.dataSource.data[parseInt(this.changeId) - 1].timingArray[this.index];
    console.log(this.dataSource.data[parseInt(this.changeId) - 1]);
  }
  doneChange(event1: any) {
    if (this.index1 == this.index) {
      this.dataSource.data[parseInt(this.userId) - 1].seatAvl = this.dataSource.data[parseInt(this.userId) - 1].seatAvl + this.currSeats - event1.seat;
      this.dataSource.data[parseInt(this.userId) - 1].seatArray[this.index] = this.dataSource.data[parseInt(this.userId) - 1].seatAvl;
      this.dataSource.data[parseInt(this.userId) - 1].totalPrice = this.dataSource.data[parseInt(this.userId) - 1].singlePrice * event1.seat;
      this.putBody = {
        "seat": event1.seat,
        "seatAvl": this.dataSource.data[parseInt(this.userId) - 1].seatAvl,
        "seatArray": this.dataSource.data[parseInt(this.userId) - 1].seatArray,
        "totalPrice": this.dataSource.data[parseInt(this.userId) - 1].totalPrice
      }
    }
    else{
      this.dataSource.data[parseInt(this.userId) - 1].seatAvl = this.dataSource.data[parseInt(this.userId) - 1].seatArray[this.index1] - event1.seat;
      this.dataSource.data[parseInt(this.userId) - 1].seatArray[this.index1] = this.dataSource.data[parseInt(this.userId) - 1].seatAvl;
      this.dataSource.data[parseInt(this.userId) - 1].seatArray[this.index] = this.dataSource.data[parseInt(this.userId) - 1].seatArray[this.index]+this.currSeats;
      this.dataSource.data[parseInt(this.userId) - 1].totalPrice = this.dataSource.data[parseInt(this.userId) - 1].priceArray[this.index1] * event1.seat;
      this.dataSource.data[parseInt(this.userId) - 1].singlePrice= this.dataSource.data[parseInt(this.userId) - 1].priceArray[this.index1];
      this.putBody = {
        "seat": event1.seat,
        "timing": this.index1,
        "scrTime": this.dataSource.data[parseInt(this.changeId) - 1].timingArray[this.index1],
        "seatAvl": this.dataSource.data[parseInt(this.userId) - 1].seatAvl,
        "seatArray": this.dataSource.data[parseInt(this.userId) - 1].seatArray,
        "totalPrice": this.dataSource.data[parseInt(this.userId) - 1].totalPrice,
        "singlePrice" : this.dataSource.data[parseInt(this.userId) - 1].singlePrice
      }
    }
    console.log(this.putBody);
    this.customerService.putCustomerData(this.userId, this.putBody).subscribe((data: any) => {
      console.log(data);
    })
    this.movieService.updateData(this.putBody.seatArray, this.movieId).subscribe((data: any) => {
      console.log(data);
    })
    this.snackBar.open("Updated Successfully!", "", {
      duration: 2000,
      panelClass: ['center-snackbar', 'red-snackbar'],
    });



  }
  valueChange(event: any) {
    this.currSeats = event.seat;
    this.userId = event.id;
    this.useId = parseInt(event.id);
    this.movieId = event.movieId;
    console.log(this.movieId)
    this.index = event.timing;
    this.index1 = event.timing;
  }
}
