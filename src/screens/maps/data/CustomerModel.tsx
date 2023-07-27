export class CustomerModel {
    storeUid: string;
    storeName: string;
    owner: string;
    phone: string;
    address: string;
    province: Province;
    city: City;
    district: District;
    subDistrict: SubDistrict;
    rw: number;
    rt: number;
    latitude: string;
    longitude: string;
    type: Type;
    category: Category;
    status: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    agent: Agent;
    site: Site;
    verified: Verified;
    verifiedAt: string;
    userImage: string;

    constructor(customerResponse: any) {
        this.storeUid = customerResponse["storeUid"];
        this.storeName = customerResponse["storeName"];
        this.owner = customerResponse["owner"];
        this.phone = customerResponse["phone"];
        this.address = customerResponse["address"];
        this.province = {
            provUid: customerResponse["province"]["provUid"],
            provName: customerResponse["province"]["provName"],
        };
        this.city = {
            cityUid: customerResponse["city"]["cityUid"],
            cityName: customerResponse["city"]["cityName"],
        };
        this.district = {
            disUid: customerResponse["district"]["disUid"],
            disName: customerResponse["district"]["disName"],
        };
        this.subDistrict = {
            subDisUid: customerResponse["subDistrict"]["subDisUid"],
            subDisName: customerResponse["subDistrict"]["subDisName"],
        };
        this.rw = customerResponse["rw"];
        this.rt = customerResponse["rt"];
        this.latitude = customerResponse["latitude"];
        this.longitude = customerResponse["longitude"];
        this.type = {
            typeUid: customerResponse["type"]["typeUid"],
            typeDesc: customerResponse["type"]["typeDesc"],
        };
        this.category = {
            catUid: customerResponse["category"]["catUid"],
            catDesc: customerResponse["category"]["catDesc"],
        };
        this.status = customerResponse["status"];
        this.notes = customerResponse["notes"];
        this.createdAt = customerResponse["createdAt"];
        this.updatedAt = customerResponse["updatedAt"];
        this.agent = {
            userUid: customerResponse["agent"]["userUid"],
            fullName: customerResponse["agent"]["fullName"],
            email: customerResponse["agent"]["email"],
        };
        this.site = {
            siteUid: customerResponse["site"]["siteUid"],
            siteName: customerResponse["site"]["siteName"],
            zoom: customerResponse["site"]["zoom"],
            latitude: customerResponse["site"]["latitude"],
            longitude: customerResponse["site"]["longitude"],
            isActive: customerResponse["site"]["isActive"],
        };
        this.verified = {
            userUid: customerResponse["verified"]["userUid"],
            fullName: customerResponse["verified"]["fullName"],
            email: customerResponse["verified"]["email"],
        };
        this.verifiedAt = customerResponse["verifiedAt"];
        this.userImage = customerResponse["userImage"];
    }
}

export interface Province {
    provUid: string;
    provName: string;
}

export interface City {
    cityUid: string;
    cityName: string;
}

export interface District {
    disUid: string;
    disName: string;
}

export interface SubDistrict {
    subDisUid: string;
    subDisName: string;
}

export interface Type {
    typeUid: string;
    typeDesc: string;
}

export interface Category {
    catUid: string;
    catDesc: string;
}

export interface Agent {
    userUid: any;
    fullName: any;
    email: any;
}

export interface Site {
    siteUid: string;
    siteName: string;
    isActive: string;
    latitude: string;
    longitude: string;
    zoom: number;
}

export interface Verified {
    userUid: string;
    fullName: string;
    email: string;
}
