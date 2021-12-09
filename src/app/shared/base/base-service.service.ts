import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseItem } from './base-item';
import { BaseStorage } from './base-storage';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends BaseItem> {
  /** Url `string`, same part of CRUD url. REDEFINE IN ALL CHILD CLASS! */
  abstract url: string;

  /** Model `T extends BaseItem`, need to create an instance of class. REDEFINE IN ALL CHILD CLASS! */
  abstract model: any = BaseItem;

  /** Model `BaseStorage<T>`, a service that stores data */
  abstract storage?: BaseStorage<T> = new BaseStorage();

  /**
   * Construct a new service with http `HttpClient`.
   */
  constructor(private http: HttpClient) {}

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and returns
   * the response body in a `Pagination<T extends BaseItem>` type.
   *
   * @param params `HttpParams` contains page/sortings/filtrings and etc.
   * @param params optional partial `LoadingData`.
   *
   * @return An `Observable` of the `HTTPResponse`, with a response body in a `Pagination<T extends BaseItem>` type.
   */
  getItems(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(this.url, { params }).pipe(
      map((data) => {
        let newData: T[] = [];
        if (Array.isArray(data)) {
          newData = data.map((element) => {
            return new this.model(element);
          });
        } else {
          newData = (data as any).data.map((element: any) => {
            return new this.model(element);
          });
        }
        return newData;
      }),
      tap((res) => {
        if (this.storage) {
          this.storage.items = res;
          this.storage.itemsSubject.next(res);
        }
        return res;
      })
    );
  }
}
