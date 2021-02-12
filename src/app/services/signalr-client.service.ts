import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalizationService } from './localization.service';

declare var $: any; // jQuery

@Injectable({
      providedIn: 'root'
    })
export class SignalRClientService {

  public refreshDashboard : Subject<void> = new Subject<void>();
  private proxy: any;
  private hubName: string = 'dashboardHub';
  private connection: any;

  private constructor(private authService: AuthService,
                      private localizationService: LocalizationService) {}

   public connectToSignalRHub(): void {
      
      //if connection exists.
      if(this.connection && this.connection.state === $.signalR.connectionState.connected){
            return;
      }
	  
	const serverUrl = window.location.origin + window.location.pathname;
      this.connection = $.hubConnection(serverUrl);
      this.connection.logging = true;
      //Create client proxy for the Hub class (without generated proxy)
      this.proxy = this.connection.createHubProxy(this.hubName);
      this.registerOnServerEvents();
      this.disconnectivityListener();
      this.startConnection();
   }

   private startConnection(): void {
      //start the connection.
      this.connection.start().done((data: any) => {
            console.log('Now connected : ' + data.transport.name);
      }).fail((error: any) => {
            console.log('could not connect ' + error);
      });
  }

  private disconnectivityListener() : void {

      this.connection.disconnected(() => {

            setTimeout(() => {
                  this.connectToSignalRHub();
            }, 60000); // Restart connection after 60 seconds if connection state is disconnected.
      });
   }

  private registerOnServerEvents(): void {
    
    this.proxy.on('refreshDashboard', () => {

       this.refreshDashboard.next();
    });

    this.proxy.on('updateUserStatus', (id : string, status: number) => {

      const user = this.authService.getCurrentUser();

      //if id matches with local storage id and status is 1 (inactive), then logout the user from application
      if(user.Id === id &&  status === 1) {

        // programatically loging out the user
        this.authService.forceLogout = true;

        this.authService.logoutUser().subscribe(() => {

            // remove items from local storage
            localStorage.clear();

            // remove local storage, redirect to login component
            this.authService.unauthorizedRedirect();
            this.localizationService.use('en');
        });
      }
   });
}

}