import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule, DxTabsModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    OpinionsComponent,
    ShortenPipe,
    PostsListComponent,
    PostDetailComponent,
    LoadingComponent,
    PostEditComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxTabsModule,
    DxListModule,
    DxLoadIndicatorModule,
    DxFormModule,
    DxTextAreaModule,
    DxButtonModule,
    DxTextBoxModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
