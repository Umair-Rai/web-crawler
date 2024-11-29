import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, NgForOf],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  articles: any[] = [];

  constructor(private http: HttpClient) {}

  fetchArticles() {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2d1043275ee84d5fa89a9b36353ef8ba';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.articles = response.articles || [];
      },
      (error) => {
        console.error('Error fetching articles:', error);
        alert('Failed to fetch articles. Please check your API key or try again later.');
      }
    );
  }
}
