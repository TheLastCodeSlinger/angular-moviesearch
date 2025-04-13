import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiService } from '../services/api.service';

/**
 * When making a request you can set the TC_NO_LOADER token to true in the HTTPContext
 * to prevent a loading spinner for that request.
 * @example
 * ```
 * inject(KeyExchangeService).getKeyExchange(2, 'body', undefined, {
 *   context: new HttpContext().set(TC_NO_LOADER, true),
 * });
 * ```
 */
export const TC_NO_LOADER = new HttpContextToken<boolean>(() => false);

const delay = 300;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(ApiService);
  // use HttpContext to turn of loading spinner for specific requests
  if (req.context.get(TC_NO_LOADER)) {
    return next(req);
  }
  api.startCall();
  return next(req).pipe(
    finalize(() => {
      // delay to prevent flickering
      setTimeout(() => {
        api.endCall();
      }, delay);
    }),
  );
};
