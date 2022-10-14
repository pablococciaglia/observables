import { ajax } from 'rxjs/ajax';
import { switchMap, map } from 'rxjs/operators';
import { zip, of } from 'rxjs';

const SW_API = 'https://swapi.dev/api';
const getRequest = (url: string) => ajax.getJSON<any>(url);
// After all observables emit, emit values as an array
getRequest(`${SW_API}/people/1`).pipe(
    switchMap(resp => zip(of(resp), getRequest(resp.starships[0]))),
    map(([character, ship]) => ({ character, ship })),
).subscribe(console.log)          