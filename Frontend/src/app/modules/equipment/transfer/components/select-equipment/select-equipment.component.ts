import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';
import { EquipmentTransferEvent } from '../../models/equipment-transfer-event.model';
import { RoomEquipment } from '../../models/room-equipment.model';
import { EquipmentTransferService } from '../../services/equipment-transfer.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-select-equipment',
  templateUrl: './select-equipment.component.html',
  styleUrls: ['./select-equipment.component.scss']
})
export class SelectEquipmentComponent implements OnInit {

  equipment: RoomEquipment[] = [];
  isEquipmentSelected: boolean = false;
  filteredEquipment: RoomEquipment[] = [];
  isSelectedEquipment: boolean = false;
  isQuickTransferVisible: boolean = false;
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Select equipment for transfer";
  isSearchActive: boolean = false;
  selectedEquipment!: RoomEquipment;
  selectedEquipmentId: number = -1;
  mostRecentlyUsedSourceRoomId: number = -1;
  mostRecentlyUsedEquipmentId: number = -1;
  @Input() equipmentTransfer!: EquipmentTransfer;
  @Output() confirmQuantityEvent = new EventEmitter();
  @Output() equipmentTransferChanged = new EventEmitter();
  transferEvents: EquipmentTransferEvent[] = [];

  constructor(private equipmentService: EquipmentService, private equipmentTransferService: EquipmentTransferService) { }

  ngOnInit(): void {
    this.equipmentService.getEquipment().subscribe(
      data => {
        this.equipment = data;
        this.filteredEquipment = data;
      }
    )
    this.equipmentTransferService.getEquipmentTransferEvents().subscribe(
      data => {
        this.transferEvents = data;
        this.findTheMostRecentEvent();
      }
    )
  }

  findTheMostRecentEvent(){
    let mostRecentEquipmentTransfer: EquipmentTransferEvent = this.transferEvents[this.transferEvents.length - 1];
    this.mostRecentlyUsedSourceRoomId = mostRecentEquipmentTransfer.sourceRoomId;
    this.mostRecentlyUsedEquipmentId = mostRecentEquipmentTransfer.equipmentId;
  }


  quickTransferSearchBySourceRoom() : void {
    this.scrollBoxTitle = "Most recently used source room's equipments";

    let equipment = this.equipment;
    equipment = equipment.filter(param => param.roomId === this.mostRecentlyUsedSourceRoomId);
    this.filteredEquipment = equipment;
  }
  // TODO: QuickTransfer with Equipment is not finished yet
  quickTransferSearchByEquipment() : void {
    this.scrollBoxTitle = "Most recently transfered equipment in different rooms";

    let equipment = this.equipment;
    equipment = equipment.filter(param => param.equipmentItemId === this.mostRecentlyUsedEquipmentId);
    this.filteredEquipment = equipment;
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['isEquipmentSelected']){
      this.isEquipmentSelected = changes.isEquipmentSelected.currentValue;
    }
  }

  search() : void{
    if(this.searchInput != ""){
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
      this.isSearchActive = true;

      let equipment = this.equipment;
      equipment = equipment.filter(param => param.equipmentItemName.toLowerCase().includes(this.searchFilter));
      this.filteredEquipment = equipment;
    }
  }

  removeFilter() : void{
    this.isSearchActive = false;
    this.searchInput = "";
    this.filteredEquipment = this.equipment;
  }

  onNotifySelectedEquipment(selectedEquipment: RoomEquipment): void{
    this.selectedEquipment = selectedEquipment;
    this.selectedEquipmentId = selectedEquipment.id;
    this.equipmentTransfer.sourceRoomId = selectedEquipment.roomId;
    this.equipmentTransfer.equipmentId = selectedEquipment.id;
    this.equipmentTransfer.quantity = 1;
    this.equipmentTransfer.destinationRoomId = -1;
    this.equipmentTransfer.transferDate = new Date(-8640000000000000);
    this.equipmentTransferChanged.emit();
    this.isSelectedEquipment = true;
  }

  removeSelectedEquipment(): void{
    this.isSelectedEquipment = false;
    this.selectedEquipmentId = -1;
  }

  decreaseQuantity(): void{
    if(this.equipmentTransfer.quantity > 1) {
      this.equipmentTransfer.quantity--;
    }
  }

  increaseQuantity(): void{
    if(this.equipmentTransfer.quantity < this.selectedEquipment.quantity) {
      this.equipmentTransfer.quantity++;
    }
  }

  quantityChange(newValue: number) {
    if(newValue < 1) {
      this.equipmentTransfer.quantity = 1;
    }
    if(newValue > this.selectedEquipment.quantity) {
      this.equipmentTransfer.quantity = this.selectedEquipment.quantity;
    }
  }

  confirmQuantity(){
    this.confirmQuantityEvent.emit();
  }

  toggleQuickEquipmentTransfer(): void{
    this.isQuickTransferVisible = !this.isQuickTransferVisible;
  }

}
