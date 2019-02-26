import GoogleAuth = gapi.auth2.GoogleAuth;
import googleClientLoad = gapi.client.load;
import {GoogleApiModule, GoogleApiConfig, GoogleApiService, GoogleAuthService, NgGapiClientConfig} from 'ng-gapi';
import IsSignedIn = gapi.auth2.IsSignedIn;
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // clientId     = '488476890181-jf376d7v1k07s4atqa6922i9mi7bdben.apps.googleusercontent.com';
  // clientSecret = 'qRgYxCwD9r8nOmfH2xKThpQq';

  constructor(private googleApiService: GoogleApiService, private googleAuth: GoogleAuthService) {
    googleApiService.onLoad().subscribe(() => {
      gapi.load('client:auth2', this.loadCallbackGoogleApi);
    });
  }
  loadCallbackGoogleApi() {
    console.log('callback loaded');
  }
  signIn(successCallback, errorCallback): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn()
          .then(res => successCallback(res))
          .catch(err => errorCallback(err));
    });
  }
  signOut(): void {
    this.googleAuth.getAuth().subscribe((auth) => auth.signOut());
  }
}

