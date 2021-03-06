import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiConfig } from './api-config.service';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseApiUrl;
  userID = '6f11e776-a78f-4c39-b391-473b566063ae';

  constructor(
    private http: HttpService
  ) { }

  // api service for get category list 
  getCategory() {
    return this.http.get(this.baseUrl + apiConfig.phraseCategoryList.getCategoryList);
  }
 
  addCategory(payload) {
    return this.http.post(this.baseUrl + apiConfig.addCategory.addCategory, payload);
  }

  createCategoryItem(payload){
    return this.http.post(this.baseUrl + apiConfig.phraseCategoryList.createCategoryList, payload)
  }

  deleteCategoryItem(payload){
    return this.http.delete(this.baseUrl + apiConfig.phraseCategoryList.deleteCategoryList, payload)
  }

  // api service for phrases servicee
  getPhrases() {
    return this.http.get(this.baseUrl + apiConfig.newPhrases.getPhrases + this.userID + '/' + 'phrases/')
  }
  
  createPhrases(payload: any) {
    return this.http.post( this.baseUrl + apiConfig.newPhrases.createPhrases + this.userID + '/' +  'phrases/', payload)
  }

  updatePhrases(payload: any) {
    return this.http.put( this.baseUrl + apiConfig.newPhrases.updatePhrases + this.userID + '/' +  'phrases/', payload)
  }
  
  deletePhrases(payload: any) {
    console.log(payload);
    return this.http.delete( this.baseUrl + apiConfig.newPhrases.deletePhrases + this.userID + '/' +  'phrases/', payload)
    
  }
  
  // api service for ask questions service
  getQuestions() {
    return this.http.get(this.baseUrl + apiConfig.askQuestions.getQuestions + this.userID + '/' + 'questions/')
  }

  createQuestions(payload) {
    return this.http.post(this.baseUrl + apiConfig.askQuestions.createQuestions + this.userID + '/' + 'questions/', payload)
  }

  putQuestions(payload) {
    return this.http.put(this.baseUrl + apiConfig.askQuestions.putQuestions + this.userID + '/' + 'questions/', payload)
  }

  deleteQuestions(payload) {
    return this.http.delete(this.baseUrl + apiConfig.askQuestions.deleteQuestions + this.userID + '/' + 'questions/', payload)
  }

  //  api service for report 

  performanceReport(){
      return this.http.get(this.baseUrl + apiConfig.report.performanceReport + this.userID + '/' + 'performance_reports/')
  }
  phraseQualifiedCallList(id){
      return this.http.get(this.baseUrl + apiConfig.report.performanceReport + this.userID + '/' + 'phrase/' + id + '/' + 'qualified_call_list/')
  }
  questionQualifiedCallList(id){
      return this.http.get(this.baseUrl + apiConfig.report.performanceReport + this.userID + '/' + 'question/' + id + '/' + 'qualified_call_list/')
  }
  disqualifiedCallList(id){
      return this.http.get(this.baseUrl + apiConfig.report.performanceReport + this.userID + '/' + 'phrase/' + id + '/' + 'disqualified_call_list/')
  }
  questionDisqualifiedCallList(id){
      return this.http.get(this.baseUrl + apiConfig.report.performanceReport + this.userID + '/' + 'question/' + id + '/' + 'disqualified_call_list/')
  }
  
  qualifiedCall(){
    return this.http.get(this.baseUrl + apiConfig.qualifiedCall.qualifiedCallList + this.userID + '/' + 'qualified_call_list')
  }

  recommendedSprint(script){
    console.log("script data &&&&&&&", script);
    
    return this.http.get(this.baseUrl + apiConfig.sprintSection.openingSprint + this.userID + '/' + 'recommended_script/' + script)
  }

  getCheckPoint(){
    return this.http.get(this.baseUrl + apiConfig.checkPoint.getCheckPoint + this.userID + '/' + 'product_checkpoint_mapping/')
  }

  createPoint(payload){
    return this.http.post(this.baseUrl + apiConfig.checkPoint.addCheckPoint + this.userID + '/' + 'product_checkpoint_mapping/', payload)
  }

  deletePoint(id){
    return this.http.delete(this.baseUrl + apiConfig.checkPoint.deleteCheckPoint + this.userID + '/' + 'product_checkpoint_mapping/', id)
  }

  getProductList(){
    return this.http.get(this.baseUrl + apiConfig.prductList.getProductList + this.userID + '/' + 'product_list/')
  }
  
  addProductItem(payload){
    return this.http.post(this.baseUrl + apiConfig.prductList.getProductList + this.userID + '/' + 'product_list/', payload)
  }

  addNewCheckPoint(payload){
    return this.http.post(this.baseUrl + apiConfig.checkPoint.createCheckPoints + this.userID + '/' + 'question_checkpoint/', payload)
  }

  getScriptReport(){
    return this.http.get(this.baseUrl + apiConfig.srciptReport.getScriptRepost + this.userID + '/' + 'call_script_report/')
  }

  getProductWiseReport(){
    return this.http.get(this.baseUrl + apiConfig.productWiseCallReport.getProductReport + this.userID + '/' + 'productwise_call_list_report/')
  }

}

