import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { NgbAccordionModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbCollapseModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { UiModule } from '../../shared/ui/ui.module';

import { OrderSortableDirective } from './orders/orders-sortable.directive';

import { EcommerceRoutingModule } from './ecommerce-routing.module';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopsComponent } from './shops/shops.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetallesComponent } from './detalles/detalles.component';
import { AcceptedComponent } from './accepted/accepted.component';
import { PendingComponent } from './pending/pending.component';
import { DeclinedComponent } from './declined/declined.component';
import { DetallesacceptedComponent } from './detallesaccepted/detallesaccepted.component';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { DetallespostulacionComponent } from './detallespostulacion/detallespostulacion.component';
import { PostexitosaComponent } from './postexitosa/postexitosa.component';
import { ProcesoasignacionComponent } from './procesoasignacion/procesoasignacion.component';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ProductsComponent, ProductDetailComponent, OrdersComponent, CustomersComponent, CartComponent, CheckoutComponent, ShopsComponent, AddProductComponent, OrderSortableDirective, DetallesComponent, AcceptedComponent, PendingComponent, DeclinedComponent, DetallesacceptedComponent, PostulacionComponent, DetallespostulacionComponent, PostexitosaComponent, ProcesoasignacionComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropzoneModule,
    ReactiveFormsModule,
    EcommerceRoutingModule,
    UiModule,
    ArchwizardModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgSelectModule,
    Ng5SliderModule,
    NgbModalModule
  ]
})
export class EcommerceModule { }
