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
  array$: Observable<any>;
  arrayLength: number;
  constructor(private algoService: AlgoService) {

  }

  ngOnInit(): void {
    this.array$ = this.algoService.array$.pipe(tap(x => this.arrayLength = x.length));
  }

  fontSize() {
    let size: number;
    if(window.innerWidth > 480) size = this.arrayLength > 50 ? 0 : 200 / this.arrayLength;
    else size = this.arrayLength > 50 ? 0 : 120 / this.arrayLength;
    return {'font-size': size + 'px'};
  }

  length(value: string, color: string) {
    if(window.innerWidth > 480) return {height: value + 'px', width: 50 / this.algoService.arrayNumber  + '%', 'background-color': color};
    else return {height: value + 'px', width: 75 / this.algoService.arrayNumber  + '%', 'background-color': color};
  }

}
