import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface TransformedResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, TransformedResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TransformedResponse<T>> {
    return next.handle().pipe(
      map((responseData) => {
        // If response already has data property, pass through
        if (responseData && typeof responseData === 'object' && 'data' in responseData) {
          return responseData;
        }
        return { data: responseData };
      }),
    );
  }
}
