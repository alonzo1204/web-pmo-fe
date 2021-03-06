import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';

import { PagesRoutingModule } from './pages-routing.module';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DndModule } from 'ngx-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PostulationsComponent } from './postulations/postulations.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangeManagementComponent } from './change-management/change-management.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectReviewComponent } from './project-review/project-review.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsReviewComponent } from './project-details-review/project-details-review.component';
import { ProjectDetailsAsignationComponent } from './project-details-asignation/project-details-asignation.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { ProjectDetailsPortfolioComponent } from './project-details-portfolio/project-details-portfolio.component';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UserDetailsComponent } from './user-details/user-details.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50
};

@NgModule({
  declarations: [DashboardComponent, PostulationsComponent, ProjectDetailsComponent, UserRegisterComponent, UsersListComponent, ChangeManagementComponent, MaintenanceComponent, AddProjectComponent, ProjectReviewComponent, ProjectsListComponent, ProjectDetailsReviewComponent, ProjectDetailsAsignationComponent, ProjectPortfolioComponent, ProjectDetailsPortfolioComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    UiModule,
    Ng2SearchPipeModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    DndModule,
    FullCalendarModule,
    LeafletModule,
    WidgetModule,
    NgbModule,
    NgbPaginationModule,
    ArchwizardModule,
    DropzoneModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class PagesModule { }
