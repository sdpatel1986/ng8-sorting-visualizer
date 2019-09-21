import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { AlgoService } from '../algo.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  arrayLength = new BehaviorSubject<number>(4);
  arrayLength$ = this.arrayLength.asObservable();

  selectedAlgo: string;
  sorting$: Observable<boolean>;
  constructor(
    private algoService: AlgoService
  ) { }

  ngOnInit() {
    this.sorting$ = this.algoService.sorting$;
  }

  changeArrayLength(e) {
    this.algoService.generateArray(e.target.value);
  }

  generateArray() {
    this.algoService.generateArray();
  }

  chooseAlgo(name) {
    this.selectedAlgo = name;
  }

  sort() {
    if (this.selectedAlgo) {
      this.algoService[this.selectedAlgo]();
    }
  }

}
