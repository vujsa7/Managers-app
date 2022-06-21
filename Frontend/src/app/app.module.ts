import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Injector} from '@angular/core';
import { setAppInjector } from './core/guards/injector.guard';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsStateDiffLoggerModule } from '@ngxs-labs/state-diff-logger';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsActionLifecycleHooksModule } from '@ngxs-labs/action-lifecycle-hooks';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    CoreModule,
    // NgXs Module in the root of our app
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    // Enabling localstorage plugin for NgXs
    NgxsStoragePluginModule.forRoot({
      key: ['mapstate']
    }),
    // For logging out states, actions etc. in console
    NgxsLoggerPluginModule.forRoot(),
    NgxsStateDiffLoggerModule,
    NgxsActionLifecycleHooksModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
