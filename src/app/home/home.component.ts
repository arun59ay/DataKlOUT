import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  selectedTabAduitText: any = 'Primary Consumable Insights';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    // this is get category api calling
    this.getCategoryList();

    // this function is for get questions 
    this.getQuestions();
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

  selectedTabAduit(event){
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
    if(item.addNewQuestion.key){
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
}
