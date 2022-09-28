import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataSource = this.dataService.getPosts();
  }

}
