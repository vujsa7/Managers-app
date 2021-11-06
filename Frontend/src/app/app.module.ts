import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { IntegrationModule } from './integration/integration.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export class Feedback{
  constructor(
    public idFeedback : string,
    public idPharmacy : string,
    public content : string
  ) {
    
  }

}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IntegrationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
