import {Component, OnDestroy} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent implements OnDestroy {

  constructor(private media: ObservableMedia) {
    super(media);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
