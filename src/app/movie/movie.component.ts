import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { GetMoviesService } from '../services/getMovies.service';
import { Movies } from '../Utilities/movieDatas';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieScreenComponent implements OnInit {
  arr: Movies[] = [];
  i: number = 0;
  init: boolean = true;

  constructor(private service: GetMoviesService) {
   }

  ngOnInit(): void {
    this.service.getMovieDetail().subscribe((data: Movies[]) => {
      this.arr = data;
      if(this.arr.length > 0)
      this.init = false;
    });
  }
  

}
