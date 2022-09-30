import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostItem } from 'src/app/shared/data-model';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  postId: number;
  post: Post;
  post$: Observable<Post>;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // this.post$ = this.dataService.getPost(+this.route.snapshot.paramMap.get('id')!);
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.post$ = this.dataService
      .getPost(this.postId)
      .pipe(map((p) => p[this.postId])) as Observable<Post>;
    // this.dataService.getPost(this.postId).subscribe((post: PostItem) => {
    //   console.log(post[this.postId]);
    // });
  }
}
