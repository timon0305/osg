import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ApplicationUser } from '../../core/classes/user';
import { MockDataService } from '../../core/services/mock-data.service';
import { INewsFeed } from '../../core/classes/newsfeed';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'osg-news-feed-page',
  templateUrl: './main.component.html'
})

export class NewsfeedComponent implements OnInit {
  @Input() applicationUser: ApplicationUser;
  feed: INewsFeed = {
    posts: []
  };

  swal: SweetAlert = _swal as any;
  postFiles = null;
  parentComment = {
    text: "",
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

  commentPostId = null;
  post_offset = 0;
  isReachedEnd = false;

  imageUrl = '';

  constructor(private readonly dataService: MockDataService, private spinner: NgxSpinnerService, private http: HttpClient, lc: NgZone) {
    window.onscroll = () => {
      let status = "not reached";
      let windowHeight = "innerHeight" in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      let body = document.body, html = document.documentElement;
      let docHeight = Math.max(body.scrollHeight,
        body.offsetHeight, html.clientHeight,
        html.scrollHeight, html.offsetHeight);
      let windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        status = 'bottom reached';
      }
      lc.run(() => {
        if (status == 'bottom reached') {
          console.log(status);
          this.onShowMore();
        }
      });
    };
  }

  onPostNewsfeed() {
    this.spinner.show();
    console.log(this.postFiles);
    const formData: FormData = new FormData();
    if (this.postFiles) {
      for (var i = 0; i < this.postFiles.length; i++) {
        formData.append('file' + i, this.postFiles[i], this.postFiles[i].name);
      }
      formData.append('file_cnt', this.postFiles.length);
    }
    formData.append('content_text', this.parentComment.text);
    this.http.post('newsfeed/setNewsfeed', formData)
      .subscribe(resp => {
        console.log(resp);
        this.ngOnInit();
        this.spinner.hide();
      });
    this.postFiles = null;
  }

  onChangeParentCommentMessage(event) {
    try {
      this.parentComment.text = event.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }

  onDeletePost(postId, isComment) {
    console.log('iscomment = ', isComment);

    this.swal({
      title: 'Are you sure?',
      text: isComment ? 'You will lose your comment data' : 'You will lose the post and all comment data',
      icon: 'warning',
      buttons: {
        confirm: { text: 'YES', className: 'btn-yellow-gradient', value: true },
        cancel: { text: 'NO', className: 'btn-black', value: false, visible: true }
      }
    }).then((result) => {
      if (result) {
        this.spinner.show();
        this.http.post('newsfeed/deleteParentNewsfeed', { id: postId })
          .subscribe(resp => {
            this.ngOnInit();
            this.spinner.hide();
          });
      }
    });
  }

  onEditPost(index) {
    this.parentComment.editText = this.feed.posts[index].content['originalText'];
    this.feed.posts[index]['isEdit'] = true;
  }
  onCancelUpdatePost(index) {
    this.feed.posts[index]['isEdit'] = false;
  }
  onUpdatePost(postId) {
    this.spinner.show();
    this.http.post('newsfeed/updateNewsfeed', { id: postId, content_text: this.parentComment.editText })
      .subscribe(resp => {
        this.ngOnInit();
        this.spinner.hide();
      });
  }
  onSelectCommentFile(postId) {
    this.commentPostId = postId;
  }
  handleCommentFileInput(files) {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('parent_id', this.commentPostId);
    this.http.post('/newsfeed/setNewsfeed', formData)
      .subscribe(resp => {
        console.log(resp);
        this.ngOnInit();
      });
  }

  handlePostFileInput(files) {
    this.postFiles = files;
  }

  onSendComment(postId, commentText) {
    this.spinner.show();
    this.http.post('newsfeed/setNewsfeed', { content_text: commentText, parent_id: postId })
      .subscribe(resp => {
        console.log(resp);
        this.ngOnInit();
        this.spinner.hide();
      });
  }

  onShowMore() {
    this.post_offset += 5;
    this.spinner.show();
    this.http.get('newsfeed/getNewsfeeds?nolimit=true&offset=' + this.post_offset)
      .subscribe(resp => {
        if (resp['posts'].length < 5) {
          this.isReachedEnd = true;
        }
        this.feed.posts = this.feed.posts.concat(resp['posts']);
        this.spinner.hide();
      });
  }

  addMoreComments(postId, comments) {
    this.feed.posts.forEach(post => {
      if (post['postId'] == postId) {
        post.comments = post.comments.concat(comments);
      }
    });
  }

  onLoadMoreComments(postId, offset) {
    console.log("posts = ", this.feed.posts);
    console.log('postId = ', postId);
    console.log('offset= ', offset);
    this.spinner.show();
    this.http.get('newsfeed/loadMoreComments?parent_id=' + postId + '&offset=' + offset)
      .subscribe(resp => {
        this.addMoreComments(postId, resp['comments']);
        console.log('posts = ', this.feed.posts);
        this.spinner.hide();
      });
  }

  ngOnInit() {
    this.parentComment.text = "";
    this.parentComment.editText = "";
    this.commentPostId = null;
    this.post_offset = 0;
    this.isReachedEnd = false;
    this.spinner.show();
    this.http.get('newsfeed/getNewsfeeds?nolimit=true&offset=' + this.post_offset)
      .subscribe(resp => {
        this.feed.posts = resp['posts'];
        this.spinner.hide();
        this.users = resp['users'];
        window.scrollTo(0, 0);
      });
  }

  openModal(imgUrl) {
    document.getElementById('imgModal').style.display = "flex";
    document.getElementById('imgModal').style.zIndex = "10";
    this.imageUrl = imgUrl;
  }

  onPrev() {
    window.location.hash = "#/profile";
  }

  closeModal() {
    document.getElementById('imgModal').style.display = "none";
  }
}
