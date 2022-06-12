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
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { ProjectDetailsPortfolioComponent } from './project-details-portfolio/project-details-portfolio.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProfileComponent } from './profile/profile.component';
import { BulkUploadProjectsComponent } from './bulk-upload-projects/bulk-upload-projects.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BulkUploadUsersComponent } from './bulk-upload-users/bulk-upload-users.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupRegisterComponent } from './group-register/group-register.component';
import { SemestersListComponent } from './semesters-list/semesters-list.component';
import { SemesterRegisterComponent } from './semester-register/semester-register.component';
import { PortfoliosListComponent } from './portfolios-list/portfolios-list.component';
import { PortfolioRegisterComponent } from './portfolio-register/portfolio-register.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { RoleGuard } from '../core/guards/role.guard';
import { PostulationsViewComponent } from './postulations-view/postulations-view.component';
import { ApplicationSettingsComponent } from './application-settings/application-settings.component';
import { ChangeRequestListComponent } from './change-request-list/change-request-list.component';
import { AddChangeRequestComponent } from './add-change-request/add-change-request.component';
import { ChangeRequestDetailComponent } from './change-request-detail/change-request-detail.component';
import { PostulationsListComponent } from './postulations-list/postulations-list.component';
import { PostulationsDetailComponent } from './postulations-detail/postulations-detail.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { ProjectHistoryComponent } from './project-history/project-history.component';
import { PostulationsHistoryComponent } from './postulations-history/postulations-history.component';

const routes: Routes = [
    { path: '', component: MaintenanceComponent },
    { path: 'profile/:code', component: ProfileComponent },
    { path: 'application-settings', component: ApplicationSettingsComponent },
    { path: 'change-request/:code', component: ChangeRequestDetailComponent, data: { role: [2,3,4,5] }, canActivate: [RoleGuard] },
    { path: 'change-request-list', component: ChangeRequestListComponent, data: { role: [2,3,4,5] }, canActivate: [RoleGuard] },
    { path: 'add-change-request', component: AddChangeRequestComponent, data: { role: [2,3,4,5] }, canActivate: [RoleGuard] },
    { path: 'companies-list', component: CompaniesListComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'company-register', component: CompanyRegisterComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'portfolios-list', component: PortfoliosListComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'portfolio-register', component: PortfolioRegisterComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'semesters-list', component: SemestersListComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'semester-register', component: SemesterRegisterComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'postulations', component: PostulationsComponent, data: { role: [2,3,4] }, canActivate: [RoleGuard] },
    { path: 'postulations-view', component: PostulationsViewComponent, data: { role: [2,3,4] }, canActivate: [RoleGuard] },
    { path: 'postulations-list', component: PostulationsListComponent },
    { path: 'postulations-history/:code', component: PostulationsHistoryComponent },
    { path: 'postulations-detail/:code', component: PostulationsDetailComponent },
    { path: 'project-details/:code', component: ProjectDetailsComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'change-management/:code', component: ChangeManagementComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'user-register', component: UserRegisterComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'user-management', component: UserManagementComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'users-list', component: UsersListComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'bulk-upload-users', component: BulkUploadUsersComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'user-details/:code', component: UserDetailsComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'group-list', component: GroupListComponent, data: { role: [2,3] }, canActivate: [RoleGuard] },
    { path: 'group-view', component: GroupViewComponent, data: { role: [2,3] }, canActivate: [RoleGuard] },
    { path: 'group-register', component: GroupRegisterComponent, data: { role: [2,3] }, canActivate: [RoleGuard] },
    { path: 'group-detail/:code', component: GroupDetailComponent, data: { role: [2,3] }, canActivate: [RoleGuard] },
    { path: 'employees', component: DashboardComponent },
    { path: 'add-project', component: AddProjectComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'project-review', component: ProjectReviewComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'projects-list', component: ProjectsListComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'project-portfolio', component: ProjectPortfolioComponent, data: { role: [2,3,4] }, canActivate: [RoleGuard] },
    { path: 'project-history/:code', component: ProjectHistoryComponent, data: { role: [2,3,4,5] }, canActivate: [RoleGuard] },
    { path: 'bulk-upload-projects', component: BulkUploadProjectsComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'project-details-review/:code', component: ProjectDetailsReviewComponent, data: { role: [4,5] }, canActivate: [RoleGuard] },
    { path: 'project-details-asignation/:code', component: ProjectDetailsAsignationComponent, data: { role: [5] }, canActivate: [RoleGuard] },
    { path: 'project-details-portfolio/:code', component: ProjectDetailsPortfolioComponent, data: { role: [2,3,4,5] }, canActivate: [RoleGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
