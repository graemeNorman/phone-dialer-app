// Core
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class CallTimerService {

  constructor() { }

  startTimer() {
    return Observable.timer(0, 1000);
  }

  formatTime(secs: number) {
    const divider = ':';
    return this.getHours(secs) + divider + this.getMinutes(secs) + divider + this.getSeconds(secs);
  }

  protected getSeconds(secs: number) {
    return this.pad(secs % 60);
  }

  private getMinutes(secs: number) {
    return this.pad((Math.floor(secs / 60)) % 60);
  }

  private getHours(secs: number) {
    return this.pad(Math.floor((secs / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

}
