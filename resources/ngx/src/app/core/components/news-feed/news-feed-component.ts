import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ApplicationUser } from '../../classes/user';
import { MockDataService } from '../../services/mock-data.service';
import { INewsFeed } from '../../classes/newsfeed';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'osg-news-feed',
  templateUrl: './news-feed.component.html'
})

export class NewsFeedComponent implements OnInit {
  @Input() applicationUser: ApplicationUser;
  feed: INewsFeed = {
    posts: []
  };

  swal: SweetAlert = _swal as any;
  postFiles: File[] = [];
  parentComment = {
    text : "",
    editText: "",
  }

  users = [];

  mentionConfig = {
    triggerChar:'@',
    maxItems:3,
    labelKey:'name',
    mentionSelect: function (item) {
      return item.name;
    }
  };

  @ViewChild('videoPlayer') videoplayer: ElementRef;    

  commentPostId = null;
  files: File[] = [];

  imageUrl = '';

  constructor(private readonly dataService: MockDataService, private spinner: NgxSpinnerService, private http: HttpClient) {

  }

  toggleVideo(event: any) {    
      this.videoplayer.nativeElement.play();    
  }  

  onSelect(event) {
    console.log(event);
    this.postFiles.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.postFiles.splice(this.postFiles.indexOf(event), 1);
  }

  onPostNewsfeed() {
    this.spinner.show();
    console.log(this.postFiles);
    const formData: FormData = new FormData();
    if(this.postFiles){
      for(var i = 0; i < this.postFiles.length; i++){
        formData.append('file'+i, this.postFiles[i], this.postFiles[i].name);
      }
      formData.append('file_cnt', this.postFiles.length.toString());
    }
    formData.append('content_text', this.parentComment.text);
    this.http.post('newsfeed/setNewsfeed', formData)
    .subscribe(resp => {
      console.log(resp);
      this.ngOnInit();
      this.spinner.hide();
    },
    error=>{
      this.spinner.hide();
      this.swal({
        title: 'Upload error',
        text: 'An error occurred while uploading files. Please check your file size. Max file size is 500MB.',
        icon: 'error'
      })
    });
    this.postFiles = null;
  }

  onChangeParentCommentMessage(event){
    try {
      this.parentComment.text = event.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  onDeletePost(postId){
    this.swal({
      title: 'Are you sure?',
      text: 'You will lose the post and all comment data',
      icon: 'warning',
      buttons: {
        confirm: {text: 'YES', className: 'btn-yellow-gradient', value: true},
        cancel: {text: 'NO', className: 'btn-black', value: false, visible: true}
      }
    }).then((result) => {
      if (result) {
        this.spinner.show();
        this.http.post('newsfeed/deleteParentNewsfeed', {id : postId})
        .subscribe(resp => {
          this.ngOnInit();
          this.spinner.hide();
        });
      }
    });
  }

  onEditPost(index){
    this.parentComment.editText = this.feed.posts[index].content['originalText'];
    this.feed.posts[index]['isEdit'] = true;
  }
  onCancelUpdatePost(index){
    this.feed.posts[index]['isEdit'] = false;
  }
  onUpdatePost(postId){
    this.spinner.show();
    this.http.post('newsfeed/updateNewsfeed', {id: postId, content_text : this.parentComment.editText})
    .subscribe(resp => {
      this.ngOnInit();
      this.spinner.hide();
    });
  }
  onSelectCommentFile(postId){
    this.commentPostId = postId;
  }
  handleCommentFileInput(files){
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('parent_id', this.commentPostId);
    this.http.post('/newsfeed/setNewsfeed', formData)
      .subscribe(resp => {
        console.log(resp);
        this.ngOnInit();
      });
  }

  handlePostFileInput(files){
    this.postFiles = files;
  }

  onSendComment(postId, commentText){
    this.spinner.show();
    this.http.post('newsfeed/setNewsfeed', {content_text : commentText, parent_id : postId})
    .subscribe(resp => {
      console.log(resp);
      this.ngOnInit();
      this.spinner.hide();
    });
  }

  ngOnInit() {
    this.parentComment.text = "";
    this.parentComment.editText = "";
    this.commentPostId = null;
    this.spinner.show();
    this.http.get('newsfeed/getNewsfeeds')
    .subscribe(resp => {
      this.feed.posts = resp['posts'];
      this.spinner.hide();
      this.users = resp['users'];
    });
  }

  openModal(imgUrl) {
    document.getElementById('imgModal').style.display = "flex";
    this.imageUrl = imgUrl; 
  }

  closeModal() {
    document.getElementById('imgModal').style.display = "none";
  }
}
