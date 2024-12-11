import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';

// Define an interface for the articles
interface Article {
  title: string;
  description?: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, NgForOf],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  articles: Article[] = []; // Now typed as Article[], not any[]

  constructor(private http: HttpClient) {}

  fetchArticles(): void {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2d1043275ee84d5fa89a9b36353ef8ba';

    this.http.get<{ articles: Article[] }>(apiUrl).subscribe(
      (response) => {
        this.articles = response.articles || [];
      },
      (error: HttpErrorResponse) => {
        // Now we explicitly type the error as HttpErrorResponse
        if (error.status === 0) {
          console.error('Network error or CORS issue');
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        alert('Failed to fetch articles. Please check your API key or try again later.');
      }
    );
  }
}
