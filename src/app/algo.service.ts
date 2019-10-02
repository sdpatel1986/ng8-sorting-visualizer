import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ARRAY } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AlgoService {
  array: BehaviorSubject<ARRAY[]> = new BehaviorSubject<ARRAY[]>(null);
  array$: Observable<ARRAY[]> = this.array.asObservable();
  sorting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sorting$: Observable<boolean> = this.sorting.asObservable().pipe(map( x => !x));
  arrayNumber: number;

  constructor() {
    this.generateArray(10);
  }

  generateArray(n?: number): void {
    this.arrayNumber = n ? n : this.arrayNumber;
    const array: ARRAY[] = new Array(this.arrayNumber).fill(0).map(() => {
      return {value: Math.ceil(Math.random() * 400), color: '#2FAFAF'};
    });
    this.array.next(array);
  }

  mergeSort(): void {
    this.sorting.next(true);
    const arr = JSON.parse(JSON.stringify(this.array.getValue())).map((x, i) => {
      x.idx = i;
      return x;
    });
    const change = [];
    mergeSortHelper(arr, 0, arr.length);
    this.mergeChange(change);

    function mergeSortHelper(array,  start, end) {
      if (array.length === 1) {
        return array;
      }
      const half = Math.floor(array.length / 2);
      const first = array.slice(0, half);
      const second = array.slice(half);

      const indexHalf = Math.floor((end + 1 + start) / 2);
      const actualFirst = mergeSortHelper(first, start, indexHalf - 1);
      const actualSecond = mergeSortHelper(second, indexHalf, end);

      let isFinalMerge = false;
      if (actualFirst.length + actualSecond.length === arr.length) { isFinalMerge = true; }

      const acturez = actualSort(actualFirst, actualSecond, isFinalMerge);
      return acturez;
    }

    function actualSort(first, second, isFinalMerge) {
      const sortedArray = [];
      let smallIdx = first[0].idx;
      first.map(x => {
        smallIdx = x.idx < smallIdx ? x.idx : smallIdx;
      });
      first[0].color = '#E06C6D';
      second[0].color = '#E06C6D';
      change.push(sortIndex(smallIdx, sortedArray, first, second));
      while (first.length && second.length) {
        if (first[0].value <= second[0].value) {
          sortedArray.push(first.shift());
        } else {
          first[0].color = '#90ED7D';
          second[0].color = '#90ED7D';
          change.push(sortIndex(smallIdx, sortedArray, first, second));

          sortedArray.push(second.shift());

          sortedArray[sortedArray.length - 1].color = '#E06C6D';
          first[0].color = '#E06C6D';
          change.push(sortIndex(smallIdx, sortedArray, first, second));
        }

        if (isFinalMerge) {
          sortedArray[sortedArray.length - 1].color = '#2FAFAF';
        } else {
          sortedArray.map(x => {
            x.color = '#8085E9';
            return x;
          });
        }
        first.map(x => {
          x.color = '#8085E9';
          return x;
        });
        second.map(x => {
          x.color = '#8085E9';
          return x;
        });

        if (first.length && second.length) {
          first[0].color = '#E06C6D';
          second[0].color = '#E06C6D';
        } else if (isFinalMerge) {
          if (first.length) {first[0].color = '#2FAFAF'; }
          if (second.length) {second[0].color = '#2FAFAF'; }
        }

        change.push(sortIndex(smallIdx, sortedArray, first, second));
      }
      return sortedArray.concat(first).concat(second);
    }

    function sortIndex(index, sortedArray, first, second) {
      const tempArray = JSON.parse(JSON.stringify(sortedArray.concat(first).concat(second))); // avoid shallow copy
      tempArray.map(x => {
        x.idx = index;
        index++;
        return x;
      });
      return tempArray;
    }
  }

  mergeChange(change): void {
    const arr = this.array.getValue();
    if (!change.length) {
      arr.forEach(el => {
        el.color = '#2FAFAF';
      });
      this.sorting.next(false);
      return;
    }
    const subChange = change.shift();
    subChange.forEach(el => {
      arr[el.idx].value = el.value;
      arr[el.idx].color = el.color;
    });
    setTimeout(() => this.mergeChange(change), 4000 / this.arrayNumber);
  }

  quickSort(): void {
    this.sorting.next(true);
    const change = [];
    const arr: any = JSON.parse(JSON.stringify(this.array.getValue())); // avoid shallow copy of behaviorSubject value
    quickSortAlgo(arr, 0, arr.length - 1);
    function quickSortAlgo(array, start, end) {
      if (start >= end) {
        const sorted = [];
        for (; end <= start && end < array.length; end++) {
          if (end < 0) {
            continue;
          }
          sorted.push({
            index: end, value: array[end].value, color: '#2FAFAF'
          });
        }
        change.push(sorted);
        return;
      }

      const pivot = start;
      let left = start + 1;
      let right = end;
      change.push([
        {index: start, value: array[start].value, color: 'yellow'},
        {index: start + 1, value: array[start + 1].value, color: '#E06C6D'},
        {index: end, value: array[end].value, color: '#E06C6D'}
      ]);

      while (right >= left) {
        if (array[right].value < array[pivot].value && array[left].value > array[pivot].value) {
          change.push([
            {index: right, value: array[right].value, color: '#90ED7D'},
            {index: left, value: array[left].value, color: '#90ED7D'},
          ],
          [
            {index: right, value: array[left].value, color: '#90ED7D'},
            {index: left, value: array[right].value, color: '#90ED7D'},
          ],
          [
            {index: right, value: array[left].value, color: '#E06C6D'},
            {index: left, value: array[right].value, color: '#E06C6D'},
          ]);
          const temp = array[right];
          array[right] = array[left];
          array[left] = temp;
        }

        if (array[right].value >= array[pivot].value) {
          if (right - 1 >= left) {
            change.push([
              {index: right, value: array[right].value, color: '#8085E9'},
              {index: right - 1, value: array[right - 1].value, color: '#E06C6D'},
            ]);
          } else {
            change.push([
              {index: right, value: array[right].value, color: '#8085E9'},
            ]);
          }
          right--;
        }

        if (array[left].value <= array[pivot].value) {
          if (right >= left + 1) {
            change.push([
              {index: left, value: array[left].value, color: '#8085E9'},
              {index: left + 1, value: array[left + 1].value, color: '#E06C6D'},
            ]);
          } else {
            if (pivot !== right) {

            } else {
              change.push([
                {index: left, value: array[left].value, color: '#8085E9'},
              ]);
            }
          }
          left++;
        }

      }

      if (pivot !== right) {
        change.push(
        [
          {index: right, value: array[right].value, color: '#90ED7D'},
          {index: pivot, value: array[pivot].value, color: '#90ED7D'},
        ],
        [
          {index: right, value: array[pivot].value, color: '#90ED7D'},
          {index: pivot, value: array[right].value, color: '#90ED7D'},
        ],
        [
          {index: right, value: array[pivot].value, color: '#2FAFAF'},
          {index: pivot, value: array[right].value, color: '#8085E9'},
        ]);
        const temp = array[right];
        array[right] = array[pivot];
        array[pivot] = temp;
      } else {
        change.push([
          {index: right, value: array[right].value, color: '#2FAFAF'},
          {index: pivot, value: array[pivot].value, color: '#2FAFAF'},
        ]);
      }

      quickSortAlgo(array, start, right - 1);
      quickSortAlgo(array, right + 1, end);
    }

    this.showChange(change);
  }

  heapSort(): void {
    this.sorting.next(true);
    const array = JSON.parse(JSON.stringify(this.array.getValue())); // avoid shallow copy of behaviorSubject value
    const change = [];
    let lastLeft = null;
    let lastRight = null;
    let lastStart = null;
    let lastHighlited = null;
    buildMaxHeap(array);
    let end = array.length - 1;
    while (end > 0) {
      if (lastHighlited != null) {
        change.push(lastHighlited);
        lastHighlited = null;
      }
      change.push(
        [
          {index: end, value: array[end].value, color: '#E06C6D'},
          {index: 0, value: array[0].value, color: '#E06C6D'}
        ],
        [
          {index: end, value: array[end].value, color: '#90ED7D'},
          {index: 0, value: array[0].value, color: '#90ED7D'}
        ],
        [
          {index: end, value: array[0].value, color: '#90ED7D'},
          {index: 0, value: array[end].value, color: '#90ED7D'}
        ],
        [
          {index: end, value: array[0].value, color: '#E06C6D'},
          {index: 0, value: array[end].value, color: '#E06C6D'}
        ],
        [
          {index: end, value: array[0].value, color: '#2FAFAF'}
        ]
      );

      const temp = array[end];
      array[end] = array[0];
      array[0] = temp;
      lastLeft = null;
      lastRight = null;
      lastStart = null;
      siftDown(array, 0, end);
      end--;
    }
    this.showChange(change);

    function buildMaxHeap(arr) {
      let currentIndex = Math.floor(arr.length / 2);
      while (currentIndex >= 0) {
        siftDown(arr, currentIndex, arr.length);
        currentIndex--;
      }
    }
    function siftDown(arr, start, e) {
      const toChange = [];
      if (lastRight != null) {
        toChange.push(
          {index: lastLeft, value: array[lastLeft].value, color: '#8085E9'},
          {index: lastRight, value: array[lastRight].value, color: '#8085E9'}
        );
      } else if (lastLeft != null) {
        toChange.push(
          {index: lastLeft, value: array[lastLeft].value, color: '#8085E9'},
        );
      }

      if (lastStart != null) {
        toChange.push(
          {index: lastStart, value: array[lastStart].value, color: '#8085E9'},
        );
      }

      if (start >= Math.floor(e / 2)) {
        lastHighlited = toChange;
        return;
      }
      const left = start * 2 + 1;
      const right = start * 2 + 2 < e ? start * 2 + 2 : null;
      let swap;

      if (right) {
        lastLeft = left;
        lastRight = right;
        toChange.push(
          {index: start, value: array[start].value, color: '#E06C6D'},
          {index: left, value: array[left].value, color: '#E06C6D'},
          {index: right, value: array[right].value, color: '#E06C6D'}
        );
        swap = arr[left].value > arr[right].value ? left : right;
      } else {
        lastLeft = left;
        lastRight = null;
        toChange.push(
          {index: start, value: array[start].value, color: '#E06C6D'},
          {index: left, value: array[left].value, color: '#E06C6D'},
        );
        swap = left;
      }

      change.push(toChange);
      lastStart = start;

      if (arr[start].value < arr[swap].value) {
        change.push(
          [
            {index: start, value: array[start].value, color: '#90ED7D'},
            {index: swap, value: array[swap].value, color: '#90ED7D'}
          ],
          [
            {index: start, value: array[swap].value, color: '#90ED7D'},
            {index: swap, value: array[start].value, color: '#90ED7D'}
          ],
          [
            {index: start, value: array[swap].value, color: '#E06C6D'},
            {index: swap, value: array[start].value, color: '#E06C6D'}
          ],
        );
        const temp = arr[swap];
        arr[swap] = arr[start];
        arr[start] = temp;
        siftDown(arr, swap, e);
      }
    }
  }

  bubbleSort(): void {
    this.sorting.next(true);
    const array: any = JSON.parse(JSON.stringify(this.array.getValue())); // avoid shallow copy of behaviorSubject value
    const change = [];
    let sorted = false;
    let round = 0;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < array.length - 1 - round; i++) {
        if (i > 0) {
          change.push([
            {index: i - 1, value: array[i - 1].value, color: '#8085E9'},
            {index: i, value: array[i].value, color: '#E06C6D'},
            {index: i + 1, value: array[i + 1].value, color: '#E06C6D'}
          ]);
        } else {
          change.push([
            {index: i, value: array[i].value, color: '#E06C6D'},
            {index: i + 1, value: array[i + 1].value, color: '#E06C6D'}
          ]);
        }
        if (array[i].value > array[i + 1].value) {
          sorted = false;
          change.push([
            {index: i, value: array[i].value, color: '#90ED7D'},
            {index: i + 1, value: array[i + 1].value, color: '#90ED7D'}
          ]);
          const temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          change.push([
            {index: i, value: array[i + 1].value, color: '#90ED7D'},
            {index: i + 1, value: array[i].value, color: '#90ED7D'}
          ]);
        }
        change.push([
          {index: i, value: array[i].value, color: '#E06C6D'},
          {index: i + 1, value: array[i + 1].value, color: '#E06C6D'}
        ]);
      }
      round++;
      change.push([
        {index: array.length - round, value: array[array.length - round].value, color: '#2FAFAF'},
        {index: array.length - round - 1, value: array[array.length - round - 1].value, color: '#8085E9'}
      ]);
    }
    this.showChange(change);
  }

  showChange(change): void {
    const arr = this.array.getValue();
    if (!change.length) {
      arr.forEach(el => {
        el.color = '#2FAFAF';
      });
      this.sorting.next(false);
      return;
    }
    const subChange = change.shift();
    subChange.forEach(el => {
      arr[el.index].value = el.value;
      arr[el.index].color = el.color;
    });
    setTimeout(() => this.showChange(change), 4000 / this.arrayNumber); // set speed as function of array length
  }

}
