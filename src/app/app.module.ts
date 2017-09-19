import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhoneDialerComponent } from './ui-phone-dialer/ui-phone-dialer.component';

import { CallLogService } from './services/numbers-store.service';
import { CallTimerService } from './services/timer.service';

@NgModule({
  declarations: [
    AppComponent,
    PhoneDialerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CallLogService, CallTimerService],
  bootstrap: [AppComponent]
})

export class AppModule { }
