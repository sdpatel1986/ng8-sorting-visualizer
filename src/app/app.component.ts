import { Component, OnInit } from '@angular/core';
import { AlgoService } from './algo.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sorting-visualizer-clone';
  array$: Observable<any>;
  arrayLength: number;
  constructor(private algoService: AlgoService) {

  }

  ngOnInit() {
    this.array$ = this.algoService.array$.pipe(tap(x => this.arrayLength = x.length));
  }

  fontSize() {
    const size = this.arrayLength > 50 ? 0 : 300 / this.arrayLength;
    return {'font-size': size + 'px'};
  }

  length(value, color) {
    return {height: value + 'px', width: 50 / this.algoService.arrayNumber  + '%', 'background-color': color};
  }

}
