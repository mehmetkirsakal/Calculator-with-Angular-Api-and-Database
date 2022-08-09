import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  posts: Post[];
  sum: Number;
  elements: Post[];
  showAllClicked: boolean = false;
  showClicked:boolean = false;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.GetAll()
    .subscribe((resp: Post[]) => this.posts = resp);
    this.postService.GetSum()
    .subscribe(resp => this.sum = resp[0].sum);
  }
  
  GetAll(){
    this.postService.GetAll()
    .subscribe((resp: Post[]) => this.posts = resp);
  }
  Sum(){
    this.postService.GetSum()
    .subscribe(resp => this.sum = resp[0].sum);
  }
 
  ShowAll(){
    
    this.showAllClicked = !this.showAllClicked;
    this.showClicked = false;
  }
  Show(){
    this.showClicked=true;
    this.showAllClicked = false;
  }
  Find(input: HTMLInputElement){
      this.postService.Find(input.value)
      .subscribe(resp => this.elements = resp);
  }
  DeleteAll(){
    this.postService.DeleteAll().subscribe();
    console.log("Database silindi.");
    this.updateAll();
  }
  Delete(input: HTMLInputElement){
    this.postService.Delete(input.value).subscribe();
    this.updateAll();
  }
  Send(input: HTMLInputElement){
    const newElement: Post = {
      data: input.value
    };
    this.postService.Send(newElement).subscribe();
    this.updateAll();
  }
  Update(input: HTMLInputElement,update: HTMLInputElement){
    const newElement: Post ={
      data: update.value
    }
    this.postService.Update(newElement,input.value).subscribe();
    this.updateAll();
  }
  updateAll(){
    this.GetAll();
    this.Sum();
  }

}
