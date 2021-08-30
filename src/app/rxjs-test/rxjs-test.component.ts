import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, AsyncSubject, of, interval, from, fromEvent } from 'rxjs';
import { map, take, scan, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'app-rxjs-test',
  templateUrl: './rxjs-test.component.html',
  styleUrls: ['./rxjs-test.component.css']
})
export class RxjsTestComponent implements OnInit, AfterViewInit {
  @ViewChild('timeoutButton', { static: false }) timeoutButton: ElementRef;
  @ViewChild('rxjsButton', { static: false }) rxjsButton: ElementRef;
  @ViewChild('result', { static: false }) result: ElementRef;
  @ViewChild('anotherOne', { static: false }) anotherOne: ElementRef;
  searchField: FormControl;
  people = [
    { name: 'Oleh', age: 27 },
    { name: 'Ira', age: 22 },
    { name: 'Ivan', age: 17 },
    { name: 'Igor', age: 14 },
    { name: 'Svetlana', age: 10 }
  ]
  streams$ = of(1, 2, 3, 4);
  arr$ = from([1, 2, 3, 4]).pipe(scan<number>((acc, val) => acc.concat(val + 1), []));
  stream$: Observable<any> = new Observable(observer => {
    observer.next('first value')
    let i = 0;
    setInterval(() => {
      observer.next(i);
      i++;
      if (i === 3) {
        console.log('run');
        observer.complete();
      }
    }, 1000);
  });

  constructor() { }

  ngOnInit() {
    this.streams$.subscribe(item => console.log('streams', item));
    this.arr$.subscribe(item => console.log('from', item));
    this.stream$.subscribe(item => console.log('item', item));
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        console.log('seatches', term)
      });
  }

  ngAfterViewInit() {
    this.timeoutButton.nativeElement.addEventListener('click', () => {
      this.timeoutButton.nativeElement.disabled = true;
      let i = 0;
      const canDrink = [];

      const interval = setInterval(() => {
        if (this.people[i]) {
          if (this.people[i].age > 12) {
            canDrink.push(this.people[i].name);
          }
          this.result.nativeElement.textContent = canDrink.join(' ');
          i++;
        } else {
          clearInterval(interval);
          this.timeoutButton.nativeElement.disabled = false;
        }
      }, 1000);
    });

    this.rxjsButton.nativeElement.addEventListener('click', () => {
      this.rxjsButton.nativeElement.disabled = true;
      interval(1000).pipe(
        take(this.people.length),
        filter(value => this.people[value].age > 14),
        map(value => this.people[value].name),
        scan<string>((acc, curr) => acc.concat(curr), [])
      ).subscribe((item) => {
        this.result.nativeElement.textContent = item.join(' ');
        console.log(item);
      }, null, () => this.rxjsButton.nativeElement.disabled = false)
    });

    fromEvent(this.anotherOne.nativeElement, 'click').subscribe(item => console.log('rom event', item));
  }
  onModelChange(event): void {
    
  }
}
