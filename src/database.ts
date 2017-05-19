import Dexie from 'dexie';
//import Dexie from '../node_modules/dexie/dist/dexie';

/** Clase que mapea la Base de datos */
export class TransactionAppDB extends Dexie{

    // TABLES de que tipo sera mi tabla <tipo, tipo>
    transactions : Dexie.Table<ITransaction, number>;
    wallets : Dexie.Table<IWallet, number>;

    constructor(){    
        // nombre de BD
        super("TransactiDB");

        /* Tener en cuenta versiones anteriores estando en Produccion */
        /*this.version(1).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl',
            wallets: '++id,amount,name'
        });
        
        this.version(2).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl',
            wallets: '++id,amount,name'
        });
        */

        this.version(1).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl,walletId',
            wallets: '++id,amount,name'
        });


        this.transactions.mapToClass(Transaction);
        this.wallets.mapToClass(Wallet);

        /**  Al crear la Base de datos "indexDB" crea una cartera principal  */
        // Wallet.createFirst();
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
    walletId: number;
}


/** ================= Para Tabla wallet ================= */
export interface IWallet{
    id?: number;
    amount: number;
    name: string;
}


/** Modelo TABLA "Transaction" de la base de datos */
export class Transaction implements ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageUrl: string;
    walletId: number;

    constructor(amount: number, title: string, 
        lat?: number, lng?:number, id?: number, imageUrl?: string, walletId?: number){
        
        this.amount=amount;
        this.title=title;
        if(lat) this.lat=lat;
        if(lng) this.lng=lng;
        if(id) this.id=id;
        if(imageUrl) this.imageUrl=imageUrl;
        if(walletId) this.walletId=walletId;
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
    static all( walletID ){
        //Transaction.all() => Todas las transacciones
        //retorna un Promise
        return db.transactions
            .where("walletId")
            .equals(walletID)
            .reverse()
            .toArray();
    }

}

export class Wallet implements IWallet{
    id?: number;
    amount: number;
    name: string;

    constructor(amount: number, name: string, id?: number){
        this.amount=amount;
        this.name=name;
        if(id) this.id=id;
    }

    /** @return One Objet Wallet */
    static getFirst(){
        return db.wallets.orderBy("id").limit(1).first();
    }

    /** Crear una cartera principal */
    static createFirst(){
        let wallet = new Wallet(0, "Cartera Principal");
        return wallet.save();
    }


    save(){
        return db.wallets.add(this);
    }

    static find(id:number){
        return db.wallets.get(id);
    }

    /** update de dexie pasando json con paramaretros a actualizar */
    static update(id:number, newAmount:number){
        return db.wallets.update(id, { amount:newAmount } );
    }

    /** Elimina toda la cartera por ende "this.id" */ 
    destroy(){
        return db.wallets.delete(this.id);
    }



    /**
    @return Promisse */
    static all(){
        //Transaction.all() => Todas las transacciones
        //retorna un Promise
        return db.wallets.orderBy("id").toArray();
    }

}

export let db = new TransactionAppDB();