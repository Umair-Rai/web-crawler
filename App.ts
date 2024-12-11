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
  articles: Article[] = []; // Typed as Article[], not any[]

  constructor(private http: HttpClient) {}

  fetchArticles(): void {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2d1043275ee84d5fa89a9b36353ef8ba';

    this.http.get<{ articles: Article[] }>(apiUrl).subscribe(
      (response) => {
        this.articles = response.articles || [];
      },
      (error: unknown) => {
        // Safely check if error is an instance of HttpErrorResponse
        if (error instanceof HttpErrorResponse) {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        } else {
          console.error('An unknown error occurred:', error);
        }
        alert('Failed to fetch articles. Please check your API key or try again later.');
      }
    );
  }
}
