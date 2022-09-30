import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post, PostItem, posts } from './data-model';

@Injectable({providedIn: 'root'})
export class DataService {

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<Post[]>(`https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json`);
    }

    getPost(id: number): Observable<PostItem> {
        return this.http.get<PostItem>(`https://ng-personal-blog-default-rtdb.firebaseio.com/posts.json?orderBy="id"&startAt=${id}&endAt=${id}`);
    }
}