import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FloorPlanState } from '../../state/floor-plan.state';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnChanges, OnInit {
  @Input() selectedFloor: number = 0;
  searchInput: string = "";
  searchFilter: string = "";
  mode!: string;
  isSearchActive: boolean = false;
  dropdownMenuVisible: boolean = false;
  @Select(FloorPlanState.selectSelectedRoomId) selectedRoomId$!: Observable<number>;
  selectedRoomId!: number;
  @Output() modeChanged: EventEmitter<string> = new EventEmitter<string>();
  scrollBoxTitle!: string;

  ngOnInit(): void {
    this.changeMode("rooms");
    this.selectedRoomId$.subscribe(data => {
      this.selectedRoomId = data;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
      this.selectedFloor = changes.selectedFloor.currentValue;
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
    this.modeChanged.emit(mode);
    if (mode == "rooms") {
      this.scrollBoxTitle = "Rooms on this floor";
    } else if (mode == "equipment") {
      this.scrollBoxTitle = "Equipment on this floor"
    }
  }

  search(): void {
    if (this.searchInput != "") {
      this.isSearchActive = true;
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
    }
  }

  removeFilter(): void {
    this.isSearchActive = false;
    this.searchInput = "";
  }

  toggleDropdownMenu(): void{
    this.dropdownMenuVisible = !this.dropdownMenuVisible;
  }
}
