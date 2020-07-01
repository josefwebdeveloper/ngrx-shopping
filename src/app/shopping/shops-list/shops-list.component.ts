import { Component, OnInit, Input } from '@angular/core';
import { Shop } from '../models/product';
import { Currency } from 'src/app/currency/models/currency';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {

  @Input() shops: Shop[];
  @Input() currencyUpdated: Currency;

  constructor() { }

  ngOnInit(): void {
  }

}
