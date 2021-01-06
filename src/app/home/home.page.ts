import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataPasien;
  dataPasienDef;

  homePage = {
    loadPage:{
      visibility:"visible"
    },
    tabelData:{
      visibility:"hidden"
    }
  }

  constructor(private http:HttpClient) {}

  ngOnInit(){
    this.getDataPasien();
  }

  getDataPasien(){
    this.homePage.loadPage.visibility = "visible";
    this.homePage.tabelData.visibility = "hidden";
    this.http.get("https://uas-ram.xyz/ganjil/DataPasien").subscribe(data=>{
      this.homePage.loadPage.visibility = "hidden";
      this.homePage.tabelData.visibility = "visible";
      this.dataPasien = data;
      this.dataPasien = this.dataPasien.DataPasien;
      this.dataPasienDef = this.dataPasien;
    });
  }

  doRefresh(event) {
    this.getDataPasien();

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }


  search(key){
    var dataSeacrh = this.dataPasienDef.filter(obj => obj.nama.toLowerCase().indexOf(key.toLowerCase()) >= 0);
    if(dataSeacrh == []){
      this.dataPasien = this.dataPasienDef;
    }
    else{
      this.dataPasien = dataSeacrh;
    }
  }

  sort(ev){
    if(ev == "id") this.dataPasien.sort(this.dynamicSort("no_rm"));
    if(ev == "nama") this.dataPasien.sort(this.dynamicSort("nama"));
    if(ev == "alamat") this.dataPasien.sort(this.dynamicSort("alamat"));
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
}
