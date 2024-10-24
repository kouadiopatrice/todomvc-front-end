import { HttpInterceptorFn } from '@angular/common/http';

export const univercelInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    headers: req.headers
      .set('Access-Control-Allow-Origin', '*') // If required, though typically added by backend
      .set('Content-Type', 'application/json'),
  });
  return next(modifiedReq);
};
