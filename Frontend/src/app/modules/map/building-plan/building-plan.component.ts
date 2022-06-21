import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { D3Service } from '@app/modules/map/services/d3.service';
import { GetBuildings } from '@app/state/map/map.actions';
import { MapState } from '@app/state/map/map.state';
import { Select, Store } from '@ngxs/store';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { Building } from './models/building.model';
import { BuildingService } from './services/building.service';

@Component({
  selector: 'map-building-plan',
  templateUrl: './building-plan.component.html',
  styleUrls: ['./building-plan.component.scss']
})
export class BuildingPlanComponent implements OnInit {

  mainBuilding!: Building;
  @Select(MapState.selectBuildings) buildings$!: Observable<Building[]>;
  buildingComponents: any;
  mapBackgroundSvg: any;
  mainBuildingId: string = 'main-building';

  constructor(private store: Store, private buildingService: BuildingService, private d3Service: D3Service, private router: Router) {
    this.mainBuilding = new Building(0, '', '', '1672.67 1424.36 1804.3 1424.36 1804.3 1453.36 2233.67 1453.36 2233.67 1807.36 2088.43 1807.36 2088.43 1864.36 1949.54 1864.36 1949.54 1807.36 1804.3 1807.36 1804.3 1836.36 1672.67 1836.36 1672.67 1424.36');
  }

  ngOnInit(): void {
    this.mapBackgroundSvg = this.d3Service.selectById("map-background");
    this.drawMainBuilding();
    this.store.dispatch(new GetBuildings());
    this.buildings$.subscribe((data) => {
      if (data.length > 0) {
        this.applyBuildingData(data[0]);
        this.d3Service.addText(this.mapBackgroundSvg, this.mainBuilding.name, { x: 2008, y: 1770 }, 'main-building-name', 'building-' + this.mainBuilding.id);
        d3.selectAll('.main-building-name').style('user-select', 'none');
        this.d3Service.drawPolygon(this.mapBackgroundSvg, this.mainBuilding, this.mainBuildingId);
        this.addNavigationToMainBuildingPlan();
      }

    })
  }

  private applyBuildingData(data: any) {
    this.mainBuilding.id = data.id;
    this.mainBuilding.name = data.name;
    this.mainBuilding.description = data.description;
  }

  private drawMainBuilding() {
    this.buildingComponents = this.buildingService.getMainBuildingComponents();
    this.d3Service.drawMulticoloredRectangles(this.mapBackgroundSvg, this.buildingComponents, this.mainBuildingId);
  }

  private addNavigationToMainBuildingPlan() {
    let mainBuilding = this.d3Service.selectById(this.mainBuildingId);
    let self = this;

    mainBuilding.on('click', function () {
      self.router.navigate(['map/floor-plan'], { queryParams: { buildingId: self.mainBuilding.id } })
    })
  }

}
