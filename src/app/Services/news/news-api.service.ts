import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newsEnvironment } from 'src/app/Environment/newsEnvironment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private baseUrl = newsEnvironment.newsApiBaseUrl;
  private apiKey = newsEnvironment.newsApiKey;

constructor(private http: HttpClient) {}

getTopHeadlines(country: string = 'in', topic: string = '') {
  let url = `${this.baseUrl}/top-headlines?country=${country}&token=${this.apiKey}`;

  if (topic) {
    url += `&topic=${topic}`;
  }

  return this.http.get<any>(url);
}
}
