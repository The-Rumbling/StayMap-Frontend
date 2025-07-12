import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';

const concertResourceEndpoint = environment.concertsEndpointPath || '';
/**
 * Servicio Angular que maneja todas las operaciones relacionadas con la asistencia a conciertos.
 * Hereda de BaseService para reutilizar funcionalidades HTTP comunes.
 */
@Injectable({
  providedIn: 'root'
})
export class ConcertService extends BaseService<any>{
  /**
   * Constructor que inicializa el endpoint del recurso para este servicio.
   */
  constructor() {
    super();
    this.resourceEndpoint = concertResourceEndpoint;
  }
/**
   * Confirma la asistencia de un usuario a un concierto específico.
   * Realiza una petición POST al backend para registrar dicha asistencia.
   *
   * @param concertId ID del concierto
   * @param userId ID del usuario
   * @returns Observable con la respuesta del servidor
   */
  public confirmAttendance(concertId: number, userId: number) {
    if (concertId <= 0) console.log("ConcertId must be greater than 0");
    if (userId <= 0) console.log("UserId must be greater than 0");

    return this.http.post(`${this.resourcePath()}/${concertId}/attend?userId=${userId}`, {}, this.httpOptions);
  }
 /**
   * Cancela la asistencia de un usuario a un concierto.
   * Realiza una petición DELETE al backend.
   *
   * @param concertId ID del concierto
   * @param userId ID del usuario
   * @returns Observable con la respuesta del servidor
   */
  public cancelAttendance(concertId: number, userId: number) {
    if (concertId <= 0) console.log("ConcertId must be greater than 0");
    if (userId <= 0) console.log("UserId must be greater than 0");

    return this.http.delete(`${this.resourcePath()}/${concertId}/attend?userId=${userId}`, this.httpOptions);
  }

  public checkAttendanceByUserId(concertId: number, userId: number) {
    if (concertId <= 0) console.log("ConcertId must be greater than 0");
    if (userId <= 0) console.log("UserId must be greater than 0");

    return this.http.get<boolean>(`${this.resourcePath()}/${concertId}/attendees?userId=${userId}`, this.httpOptions);
  }
}
