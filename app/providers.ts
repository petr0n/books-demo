import { InjectionToken } from '@angular/core';

export const lookupListToken = new InjectionToken('lookupListToken');

export const lookupLists = {
  //mediums: ['Movies', 'Series']
  bookTypes: ['Fiction', 'Non-Fiction'],
  genres: ['Science Fiction', 'SciFi/Fantasy', 'Fantasy', 'Mystery', 'Biography', 'History', 'Horror', 'Drama', 'Humor', 'Romance']
};