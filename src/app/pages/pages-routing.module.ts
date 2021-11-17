import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PostulationsComponent } from './postulations/postulations.component'
import { ProjectDetailsComponent } from './project-details/project-details.component'
import { UserRegisterComponent } from './user-register/user-register.component'
import { UsersListComponent } from './users-list/users-list.component'
import { ChangeManagementComponent } from './change-management/change-management.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ProjectReviewComponent } from './project-review/project-review.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsAsignationComponent } from './project-details-asignation/project-details-asignation.component'
import { ProjectDetailsReviewComponent } from './project-details-review/project-details-review.component';

const routes: Routes = [
    { path: '', component: MaintenanceComponent },
    { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
    { path: 'postulations', component: PostulationsComponent },
    { path: 'project-details/:code', component: ProjectDetailsComponent },
    { path: 'change-management/:code', component: ChangeManagementComponent},
    { path: 'user-register', component: UserRegisterComponent },
    { path: 'users-list', component: UsersListComponent },
    { path: 'employees', component: DashboardComponent},
    { path: 'add-project', component: AddProjectComponent},
    { path: 'project-review', component: ProjectReviewComponent},
    { path: 'projects-list', component: ProjectsListComponent},
    { path: 'project-details-review/:code', component: ProjectDetailsReviewComponent},
    { path: 'project-details-asignation/:code', component: ProjectDetailsAsignationComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
