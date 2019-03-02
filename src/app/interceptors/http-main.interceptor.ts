import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpMainInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get timestamp
    const startTimestamp = new Date().getTime();
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // another timestamp
          const endTimestamp: number = new Date().getTime();
          const responseTimes = endTimestamp - startTimestamp;
          this.logger.log('interceptor', responseTimes + '  ' + event.url);
        }
      })
    );
  }
}
