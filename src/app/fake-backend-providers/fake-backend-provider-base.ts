
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { QueueType } from '../enums/queue-type.enum';
import { AiConfig } from '../enums/ai-config.enum';
import { Region } from '../enums/region.enum';


export abstract class FakeBackendProviderBase implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.delayObservable(request, next);

        return this.handleRoute(request, next);
    }

    protected abstract handleRoute(request: HttpRequest<any>, next: HttpHandler): any;

    // helper functions

    protected httpOk(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    protected httpError(message) {
        return throwError({ error: { message } });
    }

    protected extractNumberFromUrl(url: string): number {
        return Number(url.match(new RegExp('\\/(\\d+)'))[1]);
    }

    private delayObservable(request: HttpRequest<any>, next: HttpHandler) {
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(this.handleRoute(request, next)))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    protected convertStringToEnum(stringValue) {
        switch (stringValue) {
            case QueueType[QueueType.Beginner]:
                return QueueType.Beginner;
            case QueueType[QueueType.Intermediate]:
                return QueueType.Intermediate;
            case QueueType[QueueType.Intro]:
                return QueueType.Intro;
            case AiConfig[AiConfig.Follow]:
                return AiConfig.Follow;
            case AiConfig[AiConfig.Laner]:
                return AiConfig.Laner;
            case AiConfig[AiConfig.LanerLite]:
                return AiConfig.LanerLite;
            case Region[Region.Eune]:
                return Region.Eune;
            case Region[Region.Euw]:
                return Region.Euw;
            case Region[Region.Na]:
                return Region.Na;
        }
    }
}