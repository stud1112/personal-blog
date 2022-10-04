import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Post, PostItem, User } from './data-model';

@Injectable({providedIn: 'root'})
export class DataService {
    private _user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    get user() {
        return this._user.value;
    }

    getPosts() {
        return this.http.get<Post[]>(`https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json`);
    }

    getPost(id: number): Observable<PostItem> {
        return this.http.get<PostItem>(`https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json?orderBy="id"&startAt=${id}&endAt=${id}`);
    }

    updatePost(post: Post) {
        return this.http.put(
            `https://ng-personal-blog-default-rtdb.firebaseio.com/posts/${post.id}.json`,
            post
          );
    }
}