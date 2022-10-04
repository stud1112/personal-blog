import { Component, OnInit } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data-service';
import { User } from 'src/app/shared/data-model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: any;
  postsSub: Subscription | undefined;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.postsSub = this.dataService.getPosts().subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.postsSub!.unsubscribe();
  }

  getPath(id: number) {
    const isAdmin = true;
    return !isAdmin ? id : `${id}/edit`;
  }
}
