import { Producto } from './../../models/producto';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})



export class InventarioComponent implements OnInit {
  displayedColumns: string[] = ['producto', 'marca', 'descripcion', 'stock', 'precio', 'imagen', 'accion'];
  dataSource = new MatTableDataSource<Producto>();
  constructor(private productService: ProductosService) { }

  ngOnInit(): void {
    this.getProductos();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProductos() {
    this.productService.getProductos().subscribe(
      (data: Producto[]) => {
        this.dataSource = new MatTableDataSource(data);
      }
    )
  }

  deleteProducto(id: number) {
    this.productService.deleteProducto(id).subscribe({
      next: (data: Producto) => {
        this.getProductos();
      },

      error: (e) => {
        console.log(e);
      }
    })
  }
}
