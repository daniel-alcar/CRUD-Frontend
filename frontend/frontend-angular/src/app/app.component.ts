import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  products: any[] = [];
  name = '';
  description = '';
  price = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:8080/products').subscribe(data => {
      this.products = data;
    });
  }

  createProduct() {
    const product = { name: this.name, description: this.description, price: this.price };
    this.http.post('http://localhost:8080/products', product).subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number) {
    this.http.delete('http://localhost:8080/products/' + id).subscribe(() => this.loadProducts());
  }
}
