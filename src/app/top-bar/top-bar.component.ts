import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { AlgoService } from '../algo.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  arrayLength: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  arrayLength$: Observable<number> = this.arrayLength.asObservable();
  maxArrayLength: number;
  selectedAlgo: string;
  sorting$: Observable<boolean>;
  constructor(
    private algoService: AlgoService
  ) { }

  ngOnInit(): void {
    if(window.innerWidth > 480) this.maxArrayLength = 100;
    else this.maxArrayLength = 50;
    this.sorting$ = this.algoService.sorting$;
  }

  changeArrayLength(e: MatSliderChange): void {
    this.algoService.generateArray(e.value);
  }

  generateArray(): void {
    this.algoService.generateArray();
  }

  chooseAlgo(name: string): void {
    this.selectedAlgo = name;
  }

  sort(): void {
    if (this.selectedAlgo) {
      this.algoService[this.selectedAlgo]();
    }
  }

}
