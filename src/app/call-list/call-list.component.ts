import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {
  phraseDetails: any = [];
  phrasedisqualified: any = [];
  questionDetails: any = [];
  questiondisqualified: any = [];
  allListDataFilter: any = [];
  phraseData: any = [];
  allData: any = [];
  category: any;
  verificationType: any;
  product: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      let category: any = res.category;
      let id: any = res.id;
      this.category = res.category.split('/')[0];
      this.verificationType= res.verificationType;
      this.product= res.product;
      this.filterData(this.product, this.category);
      console.log("category =========>", this.category);
    })
  }



  filterData(product: any, id: any) {
    console.log("this is verifiction type", this.verificationType);
    
    if(this.verificationType == 'verification failed'){
      this.apiService.disqualifiedCallList(id).subscribe(res => {
        let disqualifiedCallList: any = res
        disqualifiedCallList.forEach((element: any) => {
          this.allData.push(element)
        });
        console.log("alldata", this.allData);
      })
      this.apiService.questionDisqualifiedCallList(product).subscribe(res => {
        console.log(res);
        let questionCallList: any = res;
        questionCallList.forEach((element: any) => {
          this.allData.push(element);
        });
        console.log("alldata", this.allData);
      })
    }else if( this.verificationType == 'verification passed' ){
      this.apiService.phraseQualifiedCallList(id).subscribe(res => {
        let disqualifiedCallList: any = res
        disqualifiedCallList.forEach((element: any) => {
          this.allData.push(element)
        });
        console.log("alldata", this.allData);
      })
      this.apiService.questionQualifiedCallList(product).subscribe(res => {
        console.log(res);
        let questionCallList: any = res;
        questionCallList.forEach((element: any) => {
          this.allData.push(element);
        });
        console.log("alldata", this.allData);
      })
    }


  }

}
