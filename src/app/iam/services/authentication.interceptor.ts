import {HttpInterceptorFn} from '@angular/common/http';

/**
 * Interceptor for adding the authentication token to the request headers.
 * @summary
 * This interceptor adds the authentication token to the request headers if it exists in local storage.
 * If the token does not exist, the request is sent as is.
 * @param request The request object.
 * @param next The next function.
 */
export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');

  // Lista de URLs externas a excluir
  const excludedUrls = ['maps.googleapis.com',  'https://api.cloudinary.com'];

  const shouldExclude = excludedUrls.some(url => request.url.includes(url));

  // Si la URL está excluida o no hay token, no se modifica la request
  if (!token || shouldExclude) {
    return next(request);
  }

  // Si pasa, agrega el header Authorization
  const handledRequest = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(handledRequest);
};
