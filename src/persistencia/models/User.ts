export class User {
    private idUsers: number;
    private name: string;
    private e_mail : string;
    private password: string; 
    constructor(idUsers:number, name:string, e_mail: string, password: string){
        this.idUsers = idUsers;
        this.name = name;
        this.e_mail = e_mail;
        this.password= password
    }
}
  