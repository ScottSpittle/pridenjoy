import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navList: Array<{ title: string, route: string, icon?: string }> = [
    { title: 'Home', route: 'home' },
    { title: 'Accommodations', route: 'accommodation' },
    { title: 'Availability', route: 'availability' },
    { title: 'Recommendations', route: 'recommendation' },
    { title: 'Help', route: 'help' },
    { title: 'Contact Us', route: 'contact' },
    { title: 'Login', route: 'auth/login', icon: 'fa-user' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
