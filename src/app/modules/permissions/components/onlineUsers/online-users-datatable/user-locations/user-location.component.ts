import { Component, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Loader } from "@googlemaps/js-api-loader";
import { google } from "google-maps";
import { Subscription } from "rxjs";
import { ILocationXY } from "src/app/modules/permissions/models/ILocationXY.interface";
import { OnlineUsersService } from "src/app/modules/permissions/services/onlineUsers.service";

declare var google: google;

@Component({
	selector: 'user-location',
	templateUrl: './user-location.component.html',
	styleUrls: ['./user-location.component.scss'],
})

export class UserLocationComponent implements OnDestroy{
	subscribe:Subscription;
	
	styles = [
		{
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#ebe3cd"
				}
			]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#523735"
				}
			]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#f5f1e6"
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#c9b2a6"
				}
			]
		},
		{
			"featureType": "administrative.land_parcel",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#dcd2be"
				}
			]
		},
		{
			"featureType": "administrative.land_parcel",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#ae9e90"
				}
			]
		},
		{
			"featureType": "landscape.natural",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dfd2ae"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dfd2ae"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#93817c"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#a5b076"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#447530"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f5f1e6"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#fdfcf8"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f8c967"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#e9bc62"
				}
			]
		},
		{
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#e98d58"
				}
			]
		},
		{
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#db8555"
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#806b63"
				}
			]
		},
		{
			"featureType": "transit.line",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dfd2ae"
				}
			]
		},
		{
			"featureType": "transit.line",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#8f7d77"
				}
			]
		},
		{
			"featureType": "transit.line",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#ebe3cd"
				}
			]
		},
		{
			"featureType": "transit.station",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dfd2ae"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#b9d3c2"
				},
				{
					"saturation": 25
				},
				{
					"weight": 3.5
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#14fbff"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#92998d"
				}
			]
		}
	];

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: OnlineUsersService) {
		console.log(data.userId);
	}

	ngOnDestroy(): void {
		this.subscribe.unsubscribe();
	}


	private map: google.maps.Map


	ngOnInit(): void {


		let loader = new Loader({
			apiKey: 'AIzaSyBTzs8GbolL8FJKZLWSZVn2xyb1jhoWLeo',
		});

		loader.load().then(() => {
		setInterval(()=>{
			this.subscribe =	this.service.getOnlineUsersCurrentLocationData(this.data.userId).subscribe((data: ILocationXY[]) => {
	
					let location = { lat: data[0].x, lng: data[0].y }
					this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
						center: location,
						zoom: 6,
						styles: this.styles
					});
	
					const marker = new google.maps.Marker({
						position: location,
						map: this.map,
					});
	
				});
			
		},5000);
	});




	}


}