import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export declare type Image = {
  image: string,
  thumbImage: string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public imageList: Array<object> = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('assets/images.json')
      .subscribe((images: Array<Image>) => {
        console.log(images);
        this.imageList = images;
      });
  }
}
