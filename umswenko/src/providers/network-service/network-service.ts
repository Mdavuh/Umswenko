import {
  Injectable
} from '@angular/core';
import {
  Network
} from '@ionic-native/network';

import {
  Platform
} from 'ionic-angular';

import {
  Observable,
  fromEvent,
  merge,
  of
} from 'rxjs';

import {
  mapTo
} from 'rxjs/operators';

@Injectable()
export class NetworkServiceProvider {

  private online$: Observable<boolean> = null;

  constructor(private network: Network, private platform: Platform) {
    
  }

  public initializeNetwork(){
    this.online$ = Observable.create(observer => {
      observer.next(true);
    }).pipe(mapTo(true));

    if (this.platform.is('cordova')) {
      // on Device
      console.log('on device!!!!');
      this.online$ = merge(this.network
          .onConnect()
          .pipe(
            mapTo(true)
          ), this.network.onDisconnect().pipe(mapTo(false)));
    } else {
      // on Browser
      console.log('on browser!!!!');
      this.online$ = merge(of(navigator.onLine), fromEvent(window, 'online').pipe(mapTo(true)), fromEvent(window, 'offline').pipe(mapTo(false)));
    }
  }

  public getNetworkType(): string {
    return this.network.type
  }

  public getNetworkStatus(): Observable<boolean> {
    return this.online$;
  }

}