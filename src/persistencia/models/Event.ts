export class Event {
    private idEvento: number;
    private description: string;
    private max : string;
    private location: string;
    private fecha :  string; 
    private hora : string; 
    private userId : number; 
    constructor(idEvento:number, description:string, max: string, location: string, fecha: string, hora: string, userId:number){
        this.idEvento = idEvento;
        this.description = description;
        this.max = max;
        this.location= location;
        this.fecha= fecha;
        this.hora = hora; 
        this.userId = userId;  
  }
}
  