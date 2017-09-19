// Core
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// Interface
import { IPhoneNumber } from '../interfaces/phone-number.interface';

@Injectable()

export class CallLogService {

  private calls: Array<IPhoneNumber> = [];

  add_number(number_to_add: string, seconds: number) {
    const number = this.doesCallRecordExist(number_to_add);
    if (number) {
      this.update(number, seconds);
    } else {
      this.add(number_to_add, seconds);
    }

    this.calls = this.sort().reverse();
  }

  getTotalCall() {
    return _.sumBy(this.calls, 'count');
  }

  getMostFrequent(number_of_calls: number) {
    return _.take(this.calls, number_of_calls);
  }

  private doesCallRecordExist(number: string) {
    return _.find(this.calls,{number: number});
  }

  private update(number_to_update: IPhoneNumber, seconds: number) {
    number_to_update.count++;
    number_to_update.total_seconds += seconds;
  }

  private add(number_to_add: string, seconds: number) {
    this.calls.push({number: number_to_add, count: 1, total_seconds: seconds});
  }

  private sort() {
    return _.sortBy(this.calls, ['count', 'total_seconds']);
  }
}
