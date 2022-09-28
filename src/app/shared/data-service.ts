import { Injectable } from "@angular/core";
import { posts } from './data-model';

@Injectable({providedIn: 'root'})
export class DataService {
    getPosts() {
        return posts;
    }
}