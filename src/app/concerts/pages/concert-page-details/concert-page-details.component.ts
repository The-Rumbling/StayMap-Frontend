import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ConcertService } from '../../services/concert.service';
import { Concert } from '../../model/concert.entity';
import { NgForOf } from '@angular/common';
import { DateParser } from '../../../shared/services/date-parser.service';

@Component({
  selector: 'app-concert-page-details',
  templateUrl: './concert-page-details.component.html',
  imports: [NgForOf],
  styleUrls: ['./concert-page-details.component.css']
})
export class ConcertPageDetailsComponent implements OnInit {
  protected concert: Concert = new Concert({});
  protected userId: number = 0;
  protected isAttending: boolean = false;
  protected isOwner: boolean = false;
  private concertService: ConcertService = inject(ConcertService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const concertId = this.route.snapshot.paramMap.get('id');
    if (concertId) this.loadConcert(concertId);
  }

  private loadConcert(concertId: string): void {
    this.concertService.getById(concertId).subscribe({
      next: (res) => {
        this.concert = new Concert(res);
        var aux = localStorage.getItem("userId");

        if (aux != null) {
          this.userId = parseInt(aux);
          console.log("user" ,this.userId);
          console.log("concert" ,this.concert.userId);

          if (this.userId == this.concert.userId) {
            this.isOwner = true;
          }
        }

        this.checkAttendance();
      },
      error: (err) => console.error('Error cargando concierto:', err)
    });
  }

  private checkAttendance(): void {
    this.concertService.checkAttendanceByUserId(this.concert.id, this.userId).subscribe(boolean => {
      this.isAttending = boolean;
    });
  }

  protected toggleAttendance(): void {
    if (this.userId === 0)
      this.router.navigate(['/login']).then(() => {});

    if (this.isAttending)
      this.concertService.cancelAttendance(this.concert.id, this.userId).subscribe(() => alert("Asistencia Cancelada"));
    else
      this.concertService.confirmAttendance(this.concert.id, this.userId).subscribe(() => alert("Asistencia Confirmada"));
  }

  protected deleteConcert(): void {
    this.router.navigate(['/concerts']).then(() => {
      location.reload();
      this.concertService.delete(this.concert.id).subscribe();
    });
  }

  protected parseDate(date: string ): string {
    return DateParser.toSpanishLongDate(date);
  }
}
