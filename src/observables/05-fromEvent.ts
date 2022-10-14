import { fromEvent } from 'rxjs'

const src1 = fromEvent<MouseEvent>(document, 'click');
const src2 = fromEvent<KeyboardEvent>(document, 'keyup');

src1.subscribe(({ y, x }) => console.log(y, x))
src2.subscribe(({ key }) => console.log(key))
