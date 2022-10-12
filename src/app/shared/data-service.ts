import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, PostItem, User } from './data-model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get user() {
    return this._user.value;
  }

  getPosts() {
    return this.http.get<Post[]>(
      `https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json`
    ).pipe(map(posts => {
      const p = [];
      let idx = 0;
      for (const key in posts) {
        p[idx] = posts[key];
        p[idx++].id = key;
      }
      return p;
    }));
  }

  getPost(id: string): Observable<PostItem> {
    return this.http.get<PostItem>(
      // `https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json?orderBy="id"&startAt=${id}&endAt=${id}`
      `https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json?orderBy="$key"&startAt="${id}"&endAt="${id}"`
    );
  }

  addPost(
    title: string,
    description: string,
    imageUrl: string,
    author: string
  ) {
    const newPost: Post = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      author: author,
    };
    return this.http.post(
      `https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json`,
      newPost
    );
    // return of(null);
  }

  updatePost(post: Post) {
    return this.http.put(
      `https://ng-personal-blog-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      post
    );
  }

  deletePost(post: Post) {
    return this.http.delete(
      `https://ng-personal-blog-default-rtdb.firebaseio.com/posts/${post.id}.json`
    );
  }

  fakeLogin() {
    this._user.next({ email: 'test', role: 'admin' });
  }

  requestLogin(email: string, password: string) {
    if (email === 't@t.c' && password === '1') {
      this._user.next({ email: 'test', role: 'admin' });
      return 1;
    }
    return 0;
  }
}
