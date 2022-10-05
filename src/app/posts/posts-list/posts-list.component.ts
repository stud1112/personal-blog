import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data-service';
import { User } from 'src/app/shared/data-model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  isLoggedIn: boolean = false;
  posts: any;
  postsSub: Subscription | undefined;
  constructor(private ds: DataService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = (this.ds.user !== null);
    this.postsSub = this.ds.getPosts().subscribe(posts => {
      this.posts = (posts ? posts : []);
    });    
  }

  ngOnDestroy(): void {
    this.postsSub!.unsubscribe();
  }

  getPath(id: number) {
    return !this.isLoggedIn ? id : `${id}/edit`;
    // return !isAdmin ? id : `${id}`;
  }

  addPost() {
    this.router.navigate(['/posts/add']);
  }
}
