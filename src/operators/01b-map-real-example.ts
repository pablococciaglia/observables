import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

const text = document.createElement('div');

text.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut nunc interdum, commodo massa vitae, porttitor ante. Nam maximus pharetra cursus. Aenean nisi eros, fermentum nec dolor et, lobortis rhoncus neque. Duis ultricies tellus ut mauris convallis aliquam. Integer eget dui sem. Vivamus malesuada sem et auctor lobortis. Nullam nunc lacus, malesuada et consequat eget, pulvinar eu mauris. Phasellus consectetur enim neque, non luctus nisl egestas vitae. Donec pulvinar at velit tincidunt rutrum. Cras ornare metus eu felis dictum venenatis.
<br/><br/>
Integer feugiat sapien nec sollicitudin tempus. Donec sit amet mauris varius, feugiat tellus id, aliquam tellus. Praesent pretium eu sem ac placerat. Quisque dignissim hendrerit magna, quis ullamcorper elit laoreet et. Ut aliquet justo sit amet faucibus ornare. Maecenas in mauris euismod mi maximus cursus. Sed congue neque gravida arcu pulvinar volutpat.
<br/><br/>
Ut sem massa, scelerisque in quam in, mollis dictum orci. Maecenas ut sapien tempus, mattis libero sed, mollis augue. Maecenas mauris purus, egestas a felis et, placerat pharetra diam. Aliquam erat volutpat. Nam leo erat, gravida in lectus id, maximus sodales neque. Quisque tempor urna vel nulla commodo pharetra. Mauris rutrum tempor tincidunt.
<br/><br/>
Pellentesque dignissim lacinia ultrices. Integer vitae nulla est. Integer venenatis neque nisl, in volutpat urna accumsan quis. Vivamus non efficitur lorem. Nulla sit amet diam iaculis, interdum neque sed, consequat ex. Duis et tortor nulla. Maecenas ut neque elementum ligula mattis pretium ac ut diam. Cras non lorem bibendum odio vestibulum aliquet vel sit amet risus. Integer a condimentum ligula. Cras semper ipsum vel porta tempus. Nullam placerat cursus elit blandit cursus. Mauris in efficitur risus, ac sagittis diam. Aliquam erat volutpat. Nullam eu mauris magna. Donec commodo lectus vitae augue finibus, vel placerat est pretium. Cras quis sollicitudin diam.
<br/><br/>
Proin vestibulum, ipsum vestibulum varius rutrum, arcu sem tempor arcu, vel dapibus nibh dui volutpat lectus. Vivamus purus nisl, semper id mi eu, rhoncus dictum erat. Phasellus consectetur velit eu tortor sollicitudin elementum vitae eget dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam laoreet turpis vel ex convallis, id pellentesque nisi gravida. Maecenas sagittis venenatis mauris id tincidunt. Pellentesque tortor arcu, congue a laoreet non, iaculis sed neque. Praesent fringilla neque in turpis suscipit, in varius massa vehicula. Duis ac elementum turpis. Pellentesque egestas, lorem non tempus sollicitudin, nulla urna porttitor velit, et sodales erat risus ut nisl. Donec et urna leo.
`

const body = document.querySelector('body');
body.append(text)

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar')
body.append(progressBar)


const src1 = fromEvent<Event>(document, 'scroll');

const caluclatePercetageScroll = (event): number => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = event.target.documentElement;


    return (scrollTop / (scrollHeight - clientHeight)) * 100
};

src1.pipe(
    map<Event, number>(caluclatePercetageScroll),
).subscribe(percentage => {
    progressBar.style.width = `${percentage}%`
})
