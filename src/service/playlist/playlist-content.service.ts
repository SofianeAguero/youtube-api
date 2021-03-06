import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistContentService {

  playlistUrlApi = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6' +
    '&playlistId=PL-7xFS_1Uz6KK8b-7J9SCNZi4VzNoMeXU&key=AIzaSyBnRWLy2jjb9Cpyadm3plaPd__94gJEGzo';


  constructor(private https: HttpClient) { }

  getPlaylistVideos (): Observable<object> {
    return this.https
      .get(this.playlistUrlApi)
      .pipe(map((data: any) => {
        const items = data.items;
        const videos = items.map((video) => {
          return {
            title: video.snippet.title,
            link: video.snippet.resourceId.videoId,
            imgUrl : video.snippet.thumbnails.medium.url,
          };
        });
        return videos;
      }));
  }
}
