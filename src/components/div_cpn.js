import '../css/div_style.css'
import '../css/newDiv_style.less'

// 引入图片
import pic_one from "../img/6eISyvLqRL.jpg";


const divEl = document.createElement('div')
divEl.textContent = 'Hello World'
divEl.classList.add('content')
document.body.append(divEl)


const newDivEl = document.createElement('div')
newDivEl.textContent = 'test less-loader'
newDivEl.classList.add('newContent')
document.body.append(newDivEl)


// 处理图片
const picEl = document.createElement('img')
picEl.src = pic_one
document.body.append(picEl)
