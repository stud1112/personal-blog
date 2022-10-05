import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
  editMode: boolean = true;
  postId: number;
  // post$: Observable<Post>;
  // post: Post | null;
  post: any = {};
  postSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ds: DataService,
    private vref: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.editMode = id !== null;
    if (this.editMode) {
      this.postId = +id!;
      this.postSub = (
        this.ds
          .getPost(this.postId)
          .pipe(map((p) => p[this.postId])) as Observable<Post>
      ).subscribe((post) => {
        this.post = post;
      });
      // this.post$ = this.ds
      //   .getPost(this.postId)
      //   .pipe(map((p) => p[this.postId])) as Observable<Post>;
    }
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
  }

  updateButtonOptions = {
    text: 'Update',
    type: 'success',
    useSubmitBehavior: true,
  };

  goBack = () => this.router.navigate(['/posts']);

  get postLoaded() {
    return this.post.hasOwnProperty("id");
  }

  cancelButtonOptions = {
    text: 'Cancel',
    useSubmitBehavior: false,
    onClick: () => this.goBack()
  };

  updatePost(e: Event) {
    e.preventDefault();
    const post = this.post;
    // this.post = null;
    if (this.editMode) {
      console.log(post);
      this.ds.updatePost(post).subscribe(() => this.goBack());
    } else {
      const { title, description, imageUrl, author } = post;
      this.ds.addPost(title, description, imageUrl, author).subscribe(() => this.goBack());
    }
  }
}
