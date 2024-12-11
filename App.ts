import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';

// Define an interface for the articles (you can adjust based on your API response)
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

    // Update the response type from any to a more specific type
    this.http.get<{ articles: Article[] }>(apiUrl).subscribe(
      (response) => {
        // Now we know the response has an articles array of type Article[]
        this.articles = response.articles || [];
      },
      (error: any) => {
        // We are explicitly typing the error parameter to avoid "any" warning
        console.error('Error fetching articles:', error);
        alert('Failed to fetch articles. Please check your API key or try again later.');
      }
    );
  }
}
