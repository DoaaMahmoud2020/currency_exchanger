import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(new HttpResponse({ body: cachedResponse }));
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event.body);
        }
      })
    );
  }
}
