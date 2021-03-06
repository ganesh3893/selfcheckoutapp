import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('ngOnInit got called');
    this.authService.getProfile().subscribe(profile => {
      console.log('getProfile got called');
      console.log(profile);
      this.user = profile.user;
    },
  err => {
    console.log('getProfile Error got called');
    console.log(err);
    return false;
  });
  }

}
