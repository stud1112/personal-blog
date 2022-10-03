import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/data-model';
import { DataService } from 'src/app/shared/data-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  postId: number;
  post$: Observable<Post>;
  // post: Post;
  postSub: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private ds: DataService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.editMode = id !== null;
    if (this.editMode) {
      this.postId = +id!;
      // this.postSub = (
      //   this.ds
      //     .getPost(this.postId)
      //     .pipe(map((p) => p[this.postId])) as Observable<Post>
      // ).subscribe((post) => {
      //   console.log(post);
      //   this.post = post;
      // });
      this.post$ = this.ds
        .getPost(this.postId)
        .pipe(map((p) => p[this.postId])) as Observable<Post>;
    }
  }

  ngOnDestroy(): void {
    // this.postSub.unsubscribe();
  }

  updatePost(post: Post) {
    this.ds.updatePost(post).subscribe(() => this.router.navigate(['/posts']));
  }
}
