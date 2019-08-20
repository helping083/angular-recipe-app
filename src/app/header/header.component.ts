import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isAuth: boolean = false
  private userSub:Subscription;

  constructor(private dataStorage: DataStorageService, private authService: AuthServiceService) { }

  ngOnInit() {
   this.userSub = this.authService.userSubject.subscribe((user)=>{
      this.isAuth = !!user
    });
  }
  onSaveData():void {
    this.dataStorage.storeRecipe();
  }

  onFetchData():void {
    this.dataStorage.fetchRecipes().subscribe();
  }

  logout():void {
    this.authService.logOut()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  get isAuthenticated() {
    return this.isAuth;
  }
}
