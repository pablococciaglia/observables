import {Observer} from 'rxjs'
import {ajax, AjaxResponse } from 'rxjs/ajax'


const url = 'https://httpbin.org/delay/1'

const observer : Observer<AjaxResponse<any>> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}


// methods get and delet dont only need 2 arguments (url, and headers)
ajax.delete(
    url,
    {
        'my-token': 'abc123'
    }
).subscribe(observer)

// the method post and put receive 3 arguments, (the URL, body, headers)
ajax.post(
    url,
    {
        id: 1,
        name: 'pablo'
    },
    {
        'my-token': 'abc123'
    }
).subscribe(observer)

// if you want more control or do it dinamically you can configure the request manually
// this way also you can send a body in the delete request
ajax(
    {
        url,
        method: 'Delete', 
        headers: {
            'my-token': 'abc123',
        },
        body: {
            id: 1,
            name: 'pablo'
        }
    }
).subscribe(observer)
