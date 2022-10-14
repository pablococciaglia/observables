import { filter, map } from 'rxjs/operators'

import { fromEvent } from 'rxjs'

const obs$ = fromEvent<KeyboardEvent>(document, 'keyup')

// this is the way to chain all the operators inside the same pipe, the order of the sentences is important
obs$.pipe(
    map<KeyboardEvent, string>(({ key }) => key),
    filter<string>((key) => key === 'Enter')
).subscribe(console.log)
