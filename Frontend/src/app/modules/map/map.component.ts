import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { D3Service } from '@app/core/services/d3.service';
import { BuildingComponentsService } from './services/building-components.service';
import { BuildingsService } from './services/buildings.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mainBuilding = { id: 0, name: '', description: '', points: '2223.5 1051 2223.5 1405 2078.26 1405 2078.26 1462 1939.37 1462 1939.37 1405 1794.13 1405 1794.13 1434 1662.5 1434 1662.5 1022 1794.13 1022 1794.13 1051 2223.5 1051' }
  buildingComponents: any;
  mapBackgroundSvg: any;
  mainBuildingId: string = 'main-building';

  constructor(
    private buildingsService: BuildingsService,
    private buildingComponentsService: BuildingComponentsService,
    private d3Service: D3Service,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mapBackgroundSvg = this.d3Service.selectById("map-background");
    this.drawMainBuilding();  
    this.buildingsService.getBuildings()
      .subscribe(
        data => {        
          this.applyBuildingData(this.mainBuilding, data[0]);
          this.d3Service.addText(this.mapBackgroundSvg, this.mainBuilding.name, {x: 2008, y: 1350}, 'main-building-name', 'building-' + this.mainBuilding.id);
          this.d3Service.drawPolygon(this.mapBackgroundSvg, this.mainBuilding, this.mainBuildingId);
          this.addNavigationToMainBuildingPlan();
        });
  }

  private applyBuildingData(building: any, data: any) {
    building.id = data.id;
    building.name = data.name;
    building.description = data.description;
  }

  private drawMainBuilding() {
    this.buildingComponents = this.buildingComponentsService.getMainBuildingComponents();
    this.d3Service.drawMulticoloredRectangles(this.mapBackgroundSvg, this.buildingComponents, this.mainBuildingId);
  }

  private addNavigationToMainBuildingPlan() {
    let mainBuilding = this.d3Service.selectById(this.mainBuildingId);
    let self = this;

    mainBuilding.on('click', function () {
      self.router.navigate(['floor-plan'], { relativeTo: self.route, queryParams: { buildingId: self.mainBuilding.id } })
    })
  }

  
}
