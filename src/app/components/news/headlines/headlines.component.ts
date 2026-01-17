import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/Services/news/news-api.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.css']
})
export class HeadlinesComponent implements OnInit {
  topHeadlinesResult: any[] = [];

  constructor(private service: NewsApiService) {}

  countries = [
  { code: 'us', name: 'USA' },
  { code: 'in', name: 'India' },
  { code: 'gb', name: 'UK' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' }
];

selectedCountry = 'us';
selectedCategory = '';
loading = false;

loadNews() {
  this.loading = true;
  this.service
    .getTopHeadlines(this.selectedCountry, this.selectedCategory)
    .subscribe(res => {
      this.topHeadlinesResult = res.articles;
      this.loading = false;
    });
}

onCategoryReceived(category: string) {
  this.selectedCategory = category;
  this.loadNews();
}

ngOnInit() {
  this.loadNews();
}
}
