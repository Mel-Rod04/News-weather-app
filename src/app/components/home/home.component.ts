import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsApiService } from 'src/app/Services/news/news-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
   topNewsPreview: any[] = [];
  loading = false;

  constructor(
    private newsService: NewsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTopNews();
  }

  loadTopNews() {
    this.loading = true;

    this.newsService.getTopHeadlines('us')
      .subscribe(res => {
        this.topNewsPreview = res.articles.slice(0, 4);
        this.loading = false;
      });
  }

  goToHeadlines() {
    this.router.navigate(['/headline']);
  }

}
