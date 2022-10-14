import {of, Observer} from 'rxjs'
import {ajax, AjaxError, AjaxResponse} from 'rxjs/ajax'
import {map, catchError} from 'rxjs/operators'

const url = 'https://api.github.com/users?per_page=5'
const invalidUrl = 'https://api.github.com/errorinsertedusers?per_page=5'

// how to manage errors with fetch
const fetchPromess = fetch(invalidUrl);

fetchPromess
.then((response: Response) => {
    if (!response.ok){
        throw new Error (response.statusText)
    }
    return response
})
.then(resp => resp.json())
.then(resp => console.log('then:', resp))
.catch(err => console.log('error:',err))

ajax(url).pipe(
    // here we are just taking the body of the response,
    // but you can find lot of usefull info in the original response
    map(({response})=> response),
).subscribe(users => console.log('users:', users))

ajax(invalidUrl).pipe(
    map((response)=> response),
    // the catchError operator is not only for http petitions,
    // any observable that get an error could be managged with a catchError
    catchError((err: AjaxError) => {
        console.warn("error en:", err.message)
        return of([])
    })
).subscribe(users => console.log('users:', users))

const url2 = 'https://httpbin.org/delay/1'

// this is another way to do the same, but, the difference between the getJSON and the regular AJAX
// is the response, with the regular ajax you can get the status and other things, and getJSON
// is more focused on the body of the request.

const obs$ = ajax.getJSON(url2, {
    'Content-Type': 'application/json',
    'my-token': 'abc123'
}).pipe(
    catchError((err: AjaxError) => {
        console.warn("error en:", err.message)
        return of([])
    })
)

obs$.subscribe(data => console.log(data))

// also you can manage the error by the observer object into the suscription: 

const observer : Observer<AjaxResponse<any>> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

ajax(invalidUrl).subscribe(observer)

// on this way you cant launch the complete() function, unless you
// apply a catchError in the pipe and return a readable emition
