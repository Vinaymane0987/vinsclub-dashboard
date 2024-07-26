import { Component, OnInit, signal } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Store } from '@ngrx/store';
import { ProductActions } from '../products/store/actions';
import { ProductState, selectProducts } from '../products/store/reducer';
import { map } from 'rxjs';
import { take } from 'rxjs/operators'; // Import take operator
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'], // Corrected styleUrl to styleUrls
})
export class Home2Component implements OnInit {
  chartOptions = signal<ChartOptions>({
    responsive: true,
  });
  chartLabels = signal<string[]>([]);
  chartType = signal<ChartType>('line');
  ChartLegend = signal<boolean>(false);
  chartData = signal<ChartDataset<'line'>[]>([]);
  chartPlugin = signal<any[]>([]);

  constructor(private store: Store<ProductState>) {}

  ngOnInit(): void {
    // Subscribe to the products selector
    this.store
      .select(selectProducts)
      .pipe(
        take(1), // Automatically unsubscribe after the first emission
        map((products) => {
          // Extract labels and data from products
          const labels = products.data.map(
            (product: { title: string }) => product.title
          );
          const prices = products.data.map(
            (product: { price: number }) => product.price
          );

          // Generate random colors for each data point
          const colors = prices.map(() => this.getRandomColor());

          // Set chart labels and data
          this.chartLabels.set(labels);
          this.chartData.set([
            {
              data: prices,
              label: 'Product Prices',
              backgroundColor: colors, // Use the array of colors
              borderColor: colors, // Use the same colors for the line
              borderWidth: 2,
            },
          ]);
        })
      )
      .subscribe();
  }

  // Function to generate a random color
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
