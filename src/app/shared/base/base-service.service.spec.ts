import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseItem } from './base-item';
import { BaseService } from './base-service.service';

describe('BaseService', () => {
  let service: BaseService<BaseItem>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BaseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getItems() should return observable items', () => {
    let baseItems: BaseItem[] = [
      {
        id: '1',
        createdAt: '11.11.1990',
        updatedAt: '11.11.1990',
      },
      {
        id: '2',
        createdAt: '11.11.1992',
        updatedAt: '11.11.1992',
      },
    ];

    spyOn(service, 'getItems').and.callThrough();

    service.getItems().subscribe((res) => {
      expect(baseItems.length).toBe(2);
      expect(res).toEqual(baseItems);
    });

    // const request = httpMock.expectOne(`${service.url}`);
    // expect(request.request.method).toBe('GET');
    // request.flush(baseItems);
  });
});
