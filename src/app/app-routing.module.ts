import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

const routes: Routes = [  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    // pathMatch: 'full',
    component: HomeComponent,
    children: [
      {
        path: 'posts',
        component: PostsListComponent,
      },
      {
        path: 'posts/add',
        component: PostEditComponent,
      },
      {
        path: 'posts/:id',
        component: PostDetailComponent
      },
      {
        path: 'posts/:id/edit',
        component: PostEditComponent
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'opinions',
        component: OpinionsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
