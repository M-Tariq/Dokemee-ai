import { UserIdleService } from "angular-user-idle";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AuthService } from "./auth.service";
import * as config from "../config.json";

@Injectable({
  providedIn: "root",
})
export class RefreshAuthService {
  private timeoutSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public onTimeout: Observable<boolean> = this.timeoutSource.asObservable();
  public pingSub: Subscription;
  public timerSub: Subscription;
  public timeoutSub: Subscription;

  constructor(
    private userIdleService: UserIdleService,
    private authService: AuthService
  ) {}

  public stopWatching() {
    this.userIdleService.stopWatching();
    this.timeoutSource.next(false);

    if (
      this.pingSub != null &&
      this.timerSub != null &&
      this.timeoutSub != null
    ) {
      this.pingSub.unsubscribe();
      this.timerSub.unsubscribe();
      this.timeoutSub.unsubscribe();
    }
  }

  public startWatching() {
    this.userIdleService.startWatching();

    this.pingSub = this.userIdleService.ping$.subscribe(() => {
      this.refreshToken();
    });

    // Start watching when user idle is starting.
    this.timerSub = this.userIdleService
      .onTimerStart()
      .subscribe((count) => {});

    // Start watch when time is up.
    this.timeoutSub = this.userIdleService.onTimeout().subscribe(() => {
      this.timeoutSource.next(true);
    });
  }

  public resetTimer() {
    this.userIdleService.resetTimer();
  }

  private refreshToken(): void {
    if (this.authService.isAuthenticated()) {
      // parse json object from base64 encoded jwt token
      const user = this.authService.getCurrentUser();
      const tokenDetail = this.authService.getTokenDetail();

      // set a timeout to refresh the token a minute before it expires

      let data = {
        UserName: user.UserName,
        RefreshToken: tokenDetail.RefreshToken,
        IsPasswordRequired: false,
      };

      this.authService.refreshToken(data).subscribe((res) => {
        this.saveToken(res);
      });
    }
  }

  public saveToken(data) {
    this.authService.setAuthToken(data.Token);
    this.authService.setRefreshToken(data.RefreshToken);
    if (this.authService.isSessionTimeout()) {
      this.authService.removeSessionTimeout();
    }
  }
}
