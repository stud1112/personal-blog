import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxTabsModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { OpinionsComponent } from './opinions/opinions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    OpinionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxTabsModule,
    DxListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
