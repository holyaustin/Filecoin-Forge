import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Playlist } from 'src/types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  playlistLoaded$: Subject<Array<Playlist>> = new Subject<Array<Playlist>>();

  constructor() { }
}
