import { register } from './../../auth/store/auth.actions';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  PostImageResponse,
  Image,
  DeleteImageResponse,
} from '../models/image.model';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = `${environment.apiUrl}/image`;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Wpisz opis produktu tutaj...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [['insertVideo']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: true,
    uploadUrl: `${this.apiUrl}`,
    upload: (file: File) => {
      return this.uploadImage(file);
    },
  };

  constructor(private http: HttpClient) {}

  addImage(formData: FormData): Observable<Image> {
    return this.http
      .post<PostImageResponse>(`${this.apiUrl}`, formData, {
        withCredentials: true,
      })
      .pipe(
        map((resp) => {
          return { url: `${this.apiUrl}?uid=${resp.uid}` };
        }),
      );
  }

  uploadImage(file: File): Observable<HttpEvent<UploadResponse>> {
    const formData = new FormData();
    formData.append('multipartFile', file);
    return this.http
      .post<PostImageResponse>(`${this.apiUrl}`, formData, {
        withCredentials: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            const response: PostImageResponse = event.body!;
            const uploadResponse: UploadResponse = {
              imageUrl: `${this.apiUrl}?uid=${response.uid}`,
            };
            return new HttpResponse<UploadResponse>({
              ...event,
              headers: event.headers,
              status: event.status,
              statusText: event.statusText,
              url: event.url || undefined,
              body: uploadResponse,
            });
          }
          return event;
        }),
      );
  }

  deleteImage(uid: string): Observable<DeleteImageResponse> {
    const params = new HttpParams().append('uid', uid);
    return this.http.delete<DeleteImageResponse>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
