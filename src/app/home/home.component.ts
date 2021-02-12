import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('openbutton') openbutton;
  @ViewChild('closebutton') closebutton;
  categoryList: any[] = [];
  addCategoryItems: any;
  categoryName: any;
  phrsesList: any;
  showInput: boolean = false;
  editableData: any;
  phraseList: any;
  tabSelected: any = 'firstTab';
  questionList: any;
  getCategoryListItem: any;
  updatePhrasesDataList: Object;
  exampleModal: any;
  addCategoryName: '';
  suggestion: '';
  addSuggestionText: '';
  selectedTabAduitText: any = 'Primary Consumable Insights';
  openingData: any;
  closingData: any;
  products: any;
  checkpoints: any[] = [];
  productList: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedProductListItem: any;
  checkPointsListItems: any[] = [];
  checkPointsList: any[] = [];
  pointsList: any;
  IsmodelShow: boolean = false;
  foundItems: boolean = false;
  btnClick: boolean = false;
  addSuggestionOpenText: any;
  addSuggestionCloseText: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    // this is get category api calling
    this.getCategoryList();

    // this function is for get questions 
    this.getQuestions();

    // get sprint for opening
    this.opening();

    // get function for product list api
    this.getProductList();

    // get check points list
    this.getCheckPoint();


  }

  // this is get category api function
  getCategoryList() {

    this.apiService.getCategory().subscribe(res => {
      console.log(res);
      this.getCategoryListItem = res;
      this.getCategoryListItem.category_list.map(el => {
        let obj = {}
        obj['category'] = el;
        obj['phrase'] = [];
        obj['newCategory'] = '';
        this.categoryList.push(obj);
      })
      console.log(this.categoryList);
      // this is get phrases list
      this.getPhrases();

    })
  }


  getPhrases() {
    this.apiService.getPhrases().subscribe(res => {
      console.log("res from phrase", res);

      let phraseData: any = res;
      phraseData.map(el => {
        this.categoryList.map(ct => {
          if (ct.category === el.category) {
            el.show = false;
            ct.phrase.push(el);
          }
        })
      })
    })
  }

  // get data from ngmodel 
  addCategoryItemsBtn(data1, data2) {
    //  calling function after getting data
    let payload = {
      "sentence": data1,
      "category": data2,
    }
    this.createPhrases(payload);
  }

  // create phrases api function
  createPhrases(payload) {
    this.apiService.createPhrases(payload).subscribe(res => {
      console.log("this is create phrases res", res);
      if (res) {
        this.categoryList = [];
        this.getCategoryList();
      }
    })
  }

  updatePhrasesData(phrase) {

    let payload = {
      "phrase_id": phrase.id,
      "sentence": this.editableData,
      "category": phrase.category,
    }

    this.apiService.updatePhrases(payload).subscribe(res => {
      console.log(res);
      this.updatePhrasesDataList = res;
      if (this.updatePhrasesDataList) {
        this.categoryList = [];
        this.getCategoryList();
      }
    })
  }


  deletePhrases(phrase: any) {
    console.log(phrase.id);

    let payload = {
      "phrase_id": phrase.id,
    }

    console.log(payload);


    this.apiService.deletePhrases(payload).subscribe(res => {
      this.getPhrases();
    })
    console.log("phrases is deleting successfully", payload);

  }


  showEditableInput(phrase) {
    phrase.show = !phrase.show
    this.editableData = phrase.sentence;
    console.log("this is input value", phrase.sentence);
  }

  selectedTab(event) {
    console.log("event************", event);

    this.tabSelected = event;
  }

  selectedTabAduit(event) {
    this.selectedTabAduitText = event;
  }

  addCategory(name) {
    let payload = {
      "category_name": name,
    }

    this.apiService.addCategory(payload).subscribe(res => {
      if (res) {
        this.categoryList = [];
        this.getCategoryList();
        this.exampleModal.nativeElement.click();
      }
    })
  }


  // functions for questions services

  getQuestions() {
    this.apiService.getQuestions().subscribe(res => {
      this.questionList = res;
      this.questionList.map(el => {
        el.sub = [];
        el.addNewQuestion = { key: '', show: true };
        el.subject.map(each => {
          let obj = {
            key: each,
            show: false,
            newCategory: '',
            // each
          }
          // obj[each] = '',
          el.sub.push(obj)
        })

      })
      // console.log("get questions array", res);

    })
  }

  showSubject(subjects, item) {
    subjects.show = !subjects.show

  }

  updatesubjects(subjects, item) {
    console.log(item);
    let payload = {
      'question_id': item.id,
      'product': item.product,
      'subject': []
    }
    console.log(item);
    // this.questionList.map(each => {
    item.sub.map(ele => {
      payload.subject.push(ele.key);
    })
    // })

    console.log(payload);


    this.apiService.putQuestions(payload).subscribe(res => {
      console.log(res);
      this.getQuestions();
    })

  }


  deleteItem(item) {
    let payload = {
      "question_id": item.id
    }
    this.apiService.deleteQuestions(payload).subscribe(res => {
      this.getQuestions();
    })
    console.log(payload);

  }

  deleteListItem(item, i) {
    console.log(item, "first", i,);

    item.subject = item.subject.filter((each, index) => {
      return i != index
    })


    let payload = {
      'question_id': item.id,
      'product': item.product,
      'subject': item.subject,
    }



    this.apiService.putQuestions(payload).subscribe(res => {
      console.log(res);
      this.getQuestions();
    })

  }


  addQuestion(item) {
    if (item.addNewQuestion.key) {
      item.sub.push(item.addNewQuestion)
    }
    let payload = {
      'question_id': item.id,
      'product': item.product,
      'subject': []
    }
    item.sub.map(ele => {
      payload.subject.push(ele.key);
    })
    this.apiService.putQuestions(payload).subscribe(res => {
      console.log(res);
      this.getQuestions();
    })

  }

  opening() {
    this.apiService.openingSprint().subscribe(res => {
      console.log(" this is api reponse ", res);
      this.openingData = res;
    })
  }

  closing() {
    this.apiService.closingSprint().subscribe(res => {
      console.log(" this is api reponse ", res);
      this.closingData = res;
    })
  }

  getProductList() {
    this.apiService.getProductList().subscribe(res => {
      console.log("this is get product list", res);
      this.productList = res;
    })
  }

  onItemSelect(item: any, completeObject) {
    let payload = {
      "product": completeObject,
      "checkpoint": item.item
    }
    this.apiService.createPoint(payload).subscribe(res => {
      // console.log(res);
    })
  }
  onSelectAll(items: any) {
    this.selectedProductListItem = items;
    // console.log("this is selected product list items 22222", this.selectedProductListItem);

  }

  getCheckPoint() {
    this.apiService.getCheckPoint().subscribe(res => {

      this.pointsList = res;
      console.log("this is check point list *****", this.pointsList);

      // let newResponse: any;
      // newResponse = res;

      // let newIdGenenration = 1;
      // let newArray = newResponse.map(value => {
      //   let newerVersion = []
      //   if (value.status.length) {
      //     value.status.map(newVal => {
      //       if (newVal.found !== true) {
      //         newVal["id"] = newIdGenenration;
      //         newIdGenenration = newIdGenenration + 1;
      //       } else {
      //         newerVersion.push(newVal)
      //       }
      //     }
      //     )
      //   }
      //   value.selected = newerVersion;
      // })

      // this.checkPointsList = newResponse;

      // this.dropdownSettings = {
      //   singleSelection: false,
      //   idField: 'id',
      //   textField: 'item',
      //   selectAllText: 'Select All',
      //   unSelectAllText: 'UnSelect All',
      //   itemsShowLimit: 3,
      //   allowSearchFilter: true
      // };

    })
  }

  // save(selectedProductListItem, checkpoints) {
  //   console.log(this.selectedProductListItem, checkpoints);
  //   let payload = {
  //     "product": this.selectedProductListItem,
  //     "checkpoint": this.checkpoints
  //   }
  //   this.apiService.createPoint(payload).subscribe(res => {
  //     // console.log(res);
  //   })
  //   // console.log("this is api config", payload);
  // }

  // deleteCheckPoints(item) {
  //   console.log(item.id);

  //   let payload = {
  //     "map_id": item.id
  //   }

  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: payload
  //   }

  //   this.apiService.deletePoint(options).subscribe(res => {
  //     console.log("this is delete api call for create points", res);
  //     this.getCheckPoint();
  //   })
  //   console.log("this is delete api payload", payload);
  // }

  openingModal(suggestion) {
    console.log(suggestion);
    //  this.IsmodelShow=true
    // $('#exampleModal').modal('hide');
    this.openbutton.nativeElement.click();
    this.addSuggestionOpenText = suggestion;
  }
  closingModal(suggestion) {
    console.log(suggestion);
    //  this.IsmodelShow=true
    // $('#exampleModal').modal('hide');
    this.closebutton.nativeElement.click();
    this.addSuggestionCloseText = suggestion;
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

  btnClickConfig(){
    this.btnClick = !this.btnClick;
  }

  // save(selectedProductListItem, checkpoints) {
  //   console.log(this.selectedProductListItem, checkpoints);
  //   let payload = {
  //     "product": this.selectedProductListItem,
  //     "checkpoint": this.checkpoints
  //   }
  //   this.apiService.createPoint(payload).subscribe(res => {
  //     // console.log(res);
  //   })
  //   // console.log("this is api config", payload);
  // }

  // deleteCheckPoints(item) {
  //   console.log(item.id);

  //   let payload = {
  //     "map_id": item.id
  //   }

    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   body: payload
    // }

  //   this.apiService.deletePoint(options).subscribe(res => {
  //     console.log("this is delete api call for create points", res);
  //     this.getCheckPoint();
  //   })
  //   console.log("this is delete api payload", payload);
  // }

}
