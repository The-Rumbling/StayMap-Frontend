/**
 * Clase Concert que representa un concierto dentro del sistema.
 * Almacena información clave como artista, lugar, fecha, asistentes, etc.
 * Utilizada en frontend (por ejemplo, Angular o Vue) para manejar objetos de concierto.
 */
export class Concert {
  id: number;
   /**
   * Información del artista asociado al concierto
   * - name: Nombre del artista o banda
   * - genre: Género musical que representa
   */
  artist: {
    name: string,
    genre: string
  };
  image: string;
  description: string;
  date: string;
  /**
   * Lugar del evento
   * - name: Nombre del recinto
   * - address: Dirección física
   * - location: Coordenadas geográficas (latitud y longitud)
   */
  venue: {
    name:string,
    address: string,
    location: {
      lat: number,
      lng: number
    }
  };
  status: string;
  views: number[];
  attendees: number[];
  userId: number;
/**
   * Constructor que permite inicializar una instancia de Concert
   * incluso si algunos datos vienen incompletos (gracias al uso de valores por defecto).
   *
   * @param concert Objeto parcial con las propiedades del concierto
   */
  constructor(concert:{id?:number,artist?:{name:string,genre:string},image?:string,description?:string,date?:string,venue?:{name:string,address:string,location:{lat:number,lng:number}}, status?:string, views?:number[], attendees?:number[], userId?: number}) {
    this.id=concert.id || 0;
    this.artist=concert.artist || {name:'',genre:''};
    this.image=concert.image || '';
    this.description=concert.description || '';
    this.date=concert.date || '';
    this.venue=concert.venue || {name:'',address:'',location:{lat:0,lng:0}};
    this.status=concert.status || '';
    this.views=concert.views || [];
    this.attendees=concert.attendees || [];
    this.userId = concert.userId || 0;
  }
}
