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
import { PostulationsListComponent } from './postulations-list/postulations-list.component';
import { PostulationsDetailsComponent } from './postulations-details/postulations-details.component';
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

const routes: Routes = [
    { path: '', component: MaintenanceComponent },
    { path: 'profile/:code', component: ProfileComponent },
    { path: 'portfolios-list', component: PortfoliosListComponent },
    { path: 'portfolio-register', component: PortfolioRegisterComponent },
    { path: 'semesters-list', component: SemestersListComponent },
    { path: 'semester-register', component: SemesterRegisterComponent },
    { path: 'postulations', component: PostulationsComponent },
    { path: 'postulations-list', component: PostulationsListComponent },
    { path: 'postulations-details/:code', component: PostulationsDetailsComponent },
    { path: 'project-details/:code', component: ProjectDetailsComponent },
    { path: 'change-management/:code', component: ChangeManagementComponent},
    { path: 'user-register', component: UserRegisterComponent },
    { path: 'user-management', component: UserManagementComponent },
    { path: 'users-list', component: UsersListComponent },
    { path: 'bulk-upload-users', component: BulkUploadUsersComponent },
    { path: 'user-details/:code', component: UserDetailsComponent},
    { path: 'group-view', component: GroupViewComponent },
    { path: 'group-register', component: GroupRegisterComponent },
    { path: 'employees', component: DashboardComponent },
    { path: 'add-project', component: AddProjectComponent },
    { path: 'project-review', component: ProjectReviewComponent },
    { path: 'projects-list', component: ProjectsListComponent },
    { path: 'project-portfolio', component: ProjectPortfolioComponent },
    { path: 'bulk-upload-projects', component: BulkUploadProjectsComponent },
    { path: 'project-details-review/:code', component: ProjectDetailsReviewComponent },
    { path: 'project-details-asignation/:code', component: ProjectDetailsAsignationComponent },
    { path: 'project-details-portfolio/:code', component: ProjectDetailsPortfolioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
