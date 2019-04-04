import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

}
