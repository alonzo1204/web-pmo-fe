import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent
    },
    {
        path: 'shops',
        component: ShopsComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'cart/accepted',
        component: AcceptedComponent
    },
    {
        path: 'cart/pending',
        component: PendingComponent
    },
    {
        path: 'cart/declined',
        component: DeclinedComponent
    },
    {
        path: 'cart/detail',
        component: DetallesComponent
    },
    {
        path: 'cart/detailaccepted',
        component: DetallesacceptedComponent
    },
    {
        path: 'postulacion',
        component: PostulacionComponent
    },
    {
        path: 'procesoasignacion',
        component: ProcesoasignacionComponent
    },
    {
        path: 'postulacion/detalles',
        component: DetallespostulacionComponent
    },
    {
        path: 'postulacion/exito',
        component: PostexitosaComponent
    },
    {
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }
