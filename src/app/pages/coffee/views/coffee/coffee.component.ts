import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Coffee } from '@shared/types/coffe.type';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss'],
})
export default class CoffeeComponent implements OnInit {
  private readonly _httpService: HttpService = inject(HttpService);

  public data = signal<Coffee[]>([]);
  public coffeTypes: { [key: string]: number } = {};

  ngOnInit(): void {
    this._httpService.getCoffeList().subscribe((data) => {
      this.data.set(data);
      data.forEach((coffee) => {
        this.coffeTypes[coffee.tipo] = (this.coffeTypes[coffee.tipo] || 0) + 1;
      });
    });
  }
}
