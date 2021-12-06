import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Mae } from 'src/models/mae.models';
import { MaeService } from 'src/app/services/mae.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-mae',
  templateUrl: './list-mae.component.html',
  styleUrls: ['./list-mae.component.css']
})
export class ListMaeComponent implements OnInit, OnDestroy {
  maes: Mae[] = []; // se crea la lista de Maestro de Cuentas
  maesSub: Subscription;

  constructor(public maeService: MaeService, public dialog: MatDialog) {
    // se define la suscripcion.
    this.maesSub = this.maeService
    .getMaesUpdateListener()
    .subscribe((maes: Mae[]) => {
      this.maes = maes;
    });
  }

  ngOnInit(): void {
    this.maeService.getMaes();
    this.maesSub = this.maeService
      .getMaesUpdateListener()
      .subscribe((maes: Mae[]) => {
        this.maes = maes;
      });
  }

  ngOnDestroy(): void {
    this.maesSub.unsubscribe();
  }

  onDelete(id: string) {
    console.log(id);
    this.maeService.deleteMae(id);
    const dialogRef = this.dialog.open(DeleteMessage);
  }

}

@Component({
  selector: 'delete-msg',
  templateUrl: './delete-msg.componente.html',
})

export class DeleteMessage {}
