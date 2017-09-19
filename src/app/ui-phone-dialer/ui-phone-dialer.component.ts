import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CallLogService } from '../services/numbers-store.service';
import { CallTimerService } from '../services/timer.service';

@Component({
  selector: 'ui-phone-dialer',
  templateUrl: './ui-phone-dialer.component.html',
  styleUrls: ['./ui-phone-dialer.component.scss']
})

export class PhoneDialerComponent implements OnInit {

  private MAX_CALL_TIME = 10;
  numbers: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  number_to_dial: string = '';
  call_active: boolean;
  formatted_time: string = '';
  seconds: number = 0;
  timer_sub: Subscription;

  @ViewChild('start_call') start_call$;
  @ViewChild('end_call') end_call$;

  constructor(private numbersStore: CallLogService, private timerService: CallTimerService) { }

  ngOnInit() {
    Observable.fromEvent(this.start_call$.nativeElement, 'click')
      .subscribe(() => this.startCall());

    Observable.fromEvent(this.end_call$.nativeElement, 'click')
      .subscribe(() => this.endCall());

      this.call_active = false;
  }

  onClickNumber(number: string) {
    this.number_to_dial += number;
  }

  startCall() {
    this.call_active = true;
    this.timer_sub = this.timerService.startTimer().subscribe(
      (timer) => {
        if (timer <= this.MAX_CALL_TIME) {
          this.updateCallTime(timer);
        } else {
          this.endCall();
        }
      }
    );
  }

  updateCallTime(time: number) {
    this.formatted_time = 'Call time: ' + this.timerService.formatTime(time);
    this.seconds = time;
  }

  endCall() {
    this.timer_sub.unsubscribe();
    this.call_active = false;
    this.numbersStore.add_number(this.number_to_dial, this.seconds);
    this.formatted_time = '';
    this.number_to_dial = '';

    console.log('Number of calls made: ', this.numbersStore.getTotalCall());
    console.log('Call log: ', this.numbersStore.getMostFrequent(3));
  }

}
