import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Image} from '../home/home.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccommodationComponent implements OnInit {

  public imageList: any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('assets/accommodation_images.json')
      .subscribe((images: any) => {
        this.imageList = images;
      });
  }
}
