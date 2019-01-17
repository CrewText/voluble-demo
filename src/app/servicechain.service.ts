import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VolubleRequest } from './voluble-request'
import { Servicechain } from './servicechains/servicechain';

@Injectable({
  providedIn: 'root'
})
export class ServicechainService {

  constructor(private httpClient: HttpClient) { }

  getServicechain(servicechainId: string): Observable<VolubleRequest<Servicechain>> {
    return this.httpClient.get<VolubleRequest<Servicechain>>(`${environment.volubleApiUrl}/servicechains/${servicechainId}`)
      .pipe(retry(3))
  }

  getServicechainsForOrg(orgId: string): Observable<VolubleRequest<Servicechain[]>> {
    return this.httpClient.get<VolubleRequest<Servicechain[]>>(`${environment.volubleApiUrl}/servicechains`)
      .pipe(retry(3))
  }
}
