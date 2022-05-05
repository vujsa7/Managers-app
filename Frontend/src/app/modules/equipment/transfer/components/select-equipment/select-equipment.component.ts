import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EquipmentTransfer } from '@app/modules/equipment/transfer/models/equipment-transfer.model';
import { EquipmentWithRoom } from '../../models/equipment-with-room';
import { EquipmentTransferService } from '../../services/equipment-transfer.service';

@Component({
  selector: 'tr-select-equipment',
  templateUrl: './select-equipment.component.html',
  styleUrls: ['./select-equipment.component.scss']
})
export class SelectEquipmentComponent implements OnInit {

  equipment: EquipmentWithRoom[] = [];
  isEquipmentSelected: boolean = false;
  filteredEquipment: EquipmentWithRoom[] = [];
  isSelectedEquipment: boolean = false;
  isQuickTransferVisible: boolean = false;
  searchInput: string = "";
  searchFilter: string = "";
  isSearchActive: boolean = false;
  selectedEquipment!: EquipmentWithRoom;
  selectedEquipmentId: number = -1;
  mostRecentlyUsedSourceRoomId: number = -1;
  mostRecentlyUsedEquipmentId: number = -1;
  @Input() equipmentTransfer!: EquipmentTransfer;
  @Output() confirmQuantityEvent = new EventEmitter();
  @Output() equipmentTransferChanged = new EventEmitter();

  constructor(private equipmentTransferService: EquipmentTransferService) { }

  ngOnInit(): void {
    this.equipmentTransferService.getEquipment().subscribe(
      data => {
        this.equipment = data;
        this.filteredEquipment = data;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isEquipmentSelected']){
      this.isEquipmentSelected = changes.isEquipmentSelected.currentValue;
    }
  }

  search() : void{
    if(this.searchInput != ""){
      this.searchFilter = this.searchInput.toLowerCase();
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

  onSelectedEquipment(selectedEquipment: EquipmentWithRoom): void{
    this.selectedEquipmentId = selectedEquipment.id;
    this.selectedEquipment = selectedEquipment;
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
