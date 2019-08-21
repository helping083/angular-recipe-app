import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature: string = 'recipes';

  constructor(private authService: AuthServiceService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
