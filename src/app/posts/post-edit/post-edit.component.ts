import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/data-model';
import { DataService } from 'src/app/shared/data-service';
import { map } from 'rxjs/operators';
import { DxTemplateHost } from 'devextreme-angular';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit, OnDestroy {
  editMode: boolean = true;
  postId: string;
  // post$: Observable<Post>;
  // post: Post | null;
  post: any = {};
  postSub: Subscription;
  popupVisible = false;
  deletePopupOKButtonOptions: any;
  deletePopupCancelButtonOptions: any;
  deleting = false;
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
      this.postId = id!;
      this.postSub = (
        this.ds.getPost(this.postId).pipe(
          map((p) => {
            const pst = p[this.postId];
            pst.id = this.postId;
            return pst;
          })
        ) as Observable<Post>
      ).subscribe((post) => {
        this.post = post;
      });
      this.prepareDeletePopup();
    }
  }

  prepareDeletePopup() {
    const that = this;
    this.deletePopupOKButtonOptions = {
      icon: 'check',
      text: 'OK',
      onClick(e) {
        that.deleting = true;
        that.ds.deletePost(that.post).subscribe(() => {
          that.popupVisible = false;
          that.goBack();
        });
      },
    };
    this.deletePopupCancelButtonOptions = {
      text: 'Close',
      onClick(e) {
        console.log('Delete Cancel clicked');
        that.popupVisible = false;
      },
    };
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
  }

  updateButtonOptions = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true,
  };

  cancelButtonOptions = {
    text: 'Cancel',
    useSubmitBehavior: false,
    onClick: () => this.goBack(),
  };

  deleteButtonOptions = {
    text: 'Delete',
    type: 'danger',
    useSubmitBehavior: false,
    onClick: () => {
      this.popupVisible = true;
    },
  };

  goBack = () => this.router.navigate(['/posts']);

  get postLoaded() {
    return this.post.hasOwnProperty('id');
  }

  updatePost(e: Event) {
    e.preventDefault();
    const post = this.post;
    // this.post = null;
    if (this.editMode) {
      console.log(post);
      this.ds.updatePost(post).subscribe(() => this.goBack());
    } else {
      const { title, description, imageUrl, author } = post;
      this.ds
        .addPost(title, description, imageUrl, author)
        .subscribe(() => this.goBack());
    }
  }
}
