import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/core/services/portfolio.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss']
})
export class ApplicationSettingsComponent implements OnInit {

  settings: any;

  portfolio: number;
  backend: string;
  frontend: string;

  loading: boolean = false;
  button_state: boolean = false;
  backend_state: boolean = false;
  frontend_state: boolean = false;
  portfolio_state: boolean = false;

  portfolios: any[] = [];
  breadCrumbItems: Array<{}>;

  constructor(private settingService: SettingsService, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuraciones' }, { label: 'Configuraciones del Aplicativo', active: true }];
    this.loading = true;
    this.portfolioService.getPortfoliosData().subscribe({error: (err) => console.log(err), next: (rest) => this.portfolios = rest.data });
    this.getSetting();
  }

  getSetting() {
    this.settingService.getSetting(1).subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {  
        this.settings = rest.data[0];
        this.backend = this.settings.back_url;
        this.frontend = this.settings.front_url;
        this.portfolio = this.settings.portfolio.id;
        this.loading = false;
      }
    })
  }

  editState(item: number) {
    switch(item) {
      case 1: this.portfolio_state == false ? this.portfolio_state = true : this.portfolio_state = false; break;
      case 2: this.backend_state == false ? this.backend_state = true : this.backend_state = false; break;
      default: this.frontend_state == false ? this.frontend_state = true : this.frontend_state = false; 
    }
  }

  editSettings() {
    var body = { 'portfolio_id': 0, 'back_url': '' ,'front_url': '' };
    body['portfolio_id'] = this.portfolio;
    body['back_url'] = this.backend;
    body['front_url'] = this.frontend;
    this.loading = true;
    this.button_state = true;
    this.settingService.editSetting(1, body).subscribe({
      error: (err) => {
        console.log(err),
        this.loading = false;
        this.button_state = false;
        Swal.fire({
          title: 'Configuración no pudo Actualizada',
          text: 'Verifique editar bien los campos',
          icon: 'error',
          confirmButtonColor: '#E42322'
        });
      },
      next: (rest) => {
        this.getSetting();
        Swal.fire({
          title: 'Configuración Actualizada',
          text: 'La configuración ha sido actualizada exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E'
        });
      }, 
      complete: () => this.cleanprocess()
    })
  }

  cleanprocess() { 
    this.loading = false;
    this.button_state = false;
    this.backend_state = false;
    this.frontend_state = false;
    this.portfolio_state = false;
  }

}
 