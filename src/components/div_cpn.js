import '../css/div_style.css'
import '../css/newDiv_style.less'


const divEl = document.createElement('div')
divEl.textContent = 'Hello World'
divEl.classList.add('content')
document.body.append(divEl)


const newDivEl= document.createElement('div')
newDivEl.textContent = 'test less-loader'
newDivEl.classList.add('newContent')
document.body.append(newDivEl)