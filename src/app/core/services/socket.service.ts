import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  	constructor(private socket: Socket, private settingService: SettingsService) { 
		setInterval(() => {
			this.socket.emit('get configuration', true);
			this.socket.on('my project', (data: any) => { 
				if(data) this.settingService.getSetting(1).subscribe(resp => { 
					localStorage.setItem("configProject", JSON.stringify(resp.data[0]));
				});
			})
		}, 5000)
	}

	// getConfiguration() {
	// 	let config: any;
	// 	this.socket.emit('get configuration', true);
	// 	console.log(this.socket.on('my project', (data: any) => { 
	// 		if(data) this.settingService.getSetting(1).subscribe(resp => { 
	// 			return resp.data[0];
	// 		});
	// 	}))
	// }

	// this.socket.emit('get configuration', true);
	// this.socket.on('my project', (data: any) => { 
	// 	if(data) this.settingService.getSetting(1).subscribe(resp => { 
	// 		localStorage.setItem("configProject", JSON.stringify(resp.data[0]));
	// 	});
	// })

}
