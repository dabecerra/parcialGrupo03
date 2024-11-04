import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Coffee } from '@shared/types/coffe.type';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [NgFor],
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss'],
})
export default class CoffeeComponent implements OnInit {
  private readonly _httpService: HttpService = inject(HttpService);

  public data = signal<Coffee[]>([]);
  public headers = signal<String[]>([]);

  ngOnInit(): void {
    this._httpService
      .getCoffeList()
      .subscribe(
        (data) => (this.data.set(data), this.headers.set(Object.keys(data[0]))),
      );
  }
}
