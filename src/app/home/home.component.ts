import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tabSelected: any = 'firstTab';
  selectedTabAduitText: any = 'Primary Consumable Insights';
  products: any;
  pointsList: any;
  btnClick: boolean = false;
  questionList: any;
  getCategoryListItem: any[] = [];
  tabsSelected: any;
  addCategoryItem: '';
  addNewProductCategory: '';
  addNewProduct: '';

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    // this is get category api calling
    this.getCategoryList();


    // get check points list
    this.getCheckPoint();


  }



  selectedTab(event) {
    console.log("event************", event);

    this.tabSelected = event;
  }

  selectedTabAduit(event) {
    this.selectedTabAduitText = event;
  }


  showSubject(subjects, item) {
    subjects.show = !subjects.show

  }



  getCheckPoint() {
    this.apiService.getCheckPoint().subscribe(res => {

      this.pointsList = res;
      console.log("this is check point list *****", this.pointsList);

    })
  }


  checkedItems(items, products) {
    console.log(items, products);
    let payload: any;
    if (items.id) {
      payload = {
        "map_id": items.id
      }
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: payload
      }
      this.apiService.deletePoint(options).subscribe(res => {
        console.log("this is delete api call for create points", res);
        this.getCheckPoint();
      })

    } else {
      payload = {
        "product": products.product,
        "checkpoint": items.item
      }
      this.apiService.createPoint(payload).subscribe(res => {
        this.getCheckPoint();
        console.log(res);
      })
    }

  }

  btnClickConfig() {
    this.btnClick = !this.btnClick;
  }


  // / this is get category api function
  getCategoryList() {
    this.apiService.getCategory().subscribe(res => {
      let category: any = res;
      category.category_list.forEach(element => {
        let obj = {
          category: element
        }
        this.getCategoryListItem.push(obj)
      });
      this.tabsSelected = this.getCategoryListItem[0].category;
      console.log("this is category data", this.getCategoryListItem);
    })
  }
  tabs(tab) {
    console.log(tab);
    this.tabsSelected = tab;
  }

  addCategory(item) {
    console.log(item);
    let payload = {
      "category_name": item,
    }
    this.apiService.createCategoryItem(payload).subscribe(res => {
      console.log("category created", res);
      this.getCategoryListItem = [];
      this.getCategoryList();
    })
  }

  deleteCategoryItem(item) {
    let payload = {
      "category_name": item,
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: payload
    }
    this.apiService.deleteCategoryItem(options).subscribe(res => {
      console.log("category created", res);
      this.getCategoryListItem = [];
      this.getCategoryList();
    })
  }


  createNewCheckPoint(item) {

    let payload = {
      "checkpoint": item,
    }

    this.apiService.addNewCheckPoint(payload).subscribe(res => {
      console.log(res);
      this.getCheckPoint();
    })
  }

  addProductList(item){
     
     let payload = {
      "product": item,
     }

     this.apiService.addProductItem(payload).subscribe( res => {
        console.log(res);
        this.getCheckPoint();
     })
     
  }
  confirmDelete(item) {
    let confirmationModal = this.modalService.open(
      DeleteConfirmationComponent,
      {
        scrollable: true,
        centered: true,
        // windowClass: "role-and-program-modal"
      }
    );

    confirmationModal.componentInstance.deleteConfirmation.subscribe(res => {
      this.deleteCategoryItem(item); 
    });
  }
}
