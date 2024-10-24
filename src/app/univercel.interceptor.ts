import { HttpInterceptorFn } from '@angular/common/http';

export const univercelInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
