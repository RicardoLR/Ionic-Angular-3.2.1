import Dexie from 'dexie';
//import Dexie from '../node_modules/dexie/dist/dexie';

/** Clase que mapea la Base de datos */
export class TransactionAppDB extends Dexie{

    // de que tipo sera mi tabla <tipo, tipo>
    transactions : Dexie.Table<ITransaction, number>;

    constructor(){    
        // nombre de BD
        super("TransaccionesDB");

        this.version(1).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl'
        });

        this.transactions.mapToClass(Transaction);
    }
}

export interface ICategory{
}

/** Opcional  en ID  ?  
Mapear la TABLA de la base de datos */
export interface ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageUrl: string;
}

/** Modelo TABLA "Transaction" de la base de datos */
export class Transaction implements ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageUrl: string;

    constructor(amount: number, title: string, lat?: number, lng?:number, id?: number, imageUrl?: string){
        this.amount=amount;
        this.title=title;
        if(lat) this.lat=lat;
        if(lng) this.lng=lng;
        if(id) this.id=id;
        if(imageUrl) this.imageUrl=imageUrl;
    }

    save(){
        return db.transactions.add(this);
    }

    /** @params objeto coords */
    setCoords(coords){
        this.lat=coords.latitude;
        this.lng=coords.longitude;
    }

    getImage():string{
        if(this.imageUrl){
            return this.imageUrl;
        } else {
            return "blue";
        }
    }

    hasLocation():boolean{
        return !!(this.lat && this.lng);
    }

    cleanCoords(){
        this.lat=null;
        this.lng=null;
    }

    /**
    @return Promisse */
    static all(){
        //Transaction.all() => Todas las transacciones
        //retorna un Promise
        return db.transactions.orderBy("id").reverse().toArray();
    }
}

export let db = new TransactionAppDB();