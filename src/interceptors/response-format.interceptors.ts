import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'success',
          message: 'Operation was successful!',
          data: data,
        };
      }),
      catchError((error) => {
        // const message = error.message || 'Something went wrong';
        // const status = error.status || 500;
        return throwError(
          () => new Error(error.message || 'Something went wrong'),
        );
      }),
    );
  }
}
