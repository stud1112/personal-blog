import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'personal-blog';

  constructor(private ds: DataService) { }
  
  ngOnInit(): void {
    this.ds.fakeLogin();
  }
}
