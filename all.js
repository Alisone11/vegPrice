const url = 'https://hexschool.github.io/js-filter-data/data.json'
let data = [] ;
let filterData = [];
const showList =document.querySelector('.showList');
const btnGroup = document.querySelector('.button-group');
const btnType = document.querySelectorAll('.button-group button');
const crop = document.querySelector('#crop');
const cropBtn = document.querySelector('.search');
const cropName = document.querySelector('#js-crop-name');
const select = document.querySelector('#js-select');
const sortArea = document.querySelector('.js-sort-advanced');
const sortUp = document.querySelectorAll('.fa-caret-up');
const sortDown = document.querySelectorAll('.fa-caret-down');

axios.get(url)
.then(res => {
  data = res.data;
  filterData = data;
})
.catch(error => console.log(error.response));

function init(){
  let str = '';
  filterData.forEach(item => {
    str += `<tr>
    <td>${item.作物名稱}</td>
    <td>${item.市場名稱}</td>
    <td>${item.上價}</td>
    <td>${item.中價}</td>
    <td>${item.下價}</td>
    <td>${item.平均價}</td>
    <td>${item.交易量}</td>
  </tr>`
  });
  showList.innerHTML = str;
}

function categoryData (e){
  cropName.innerHTML = '';
  btnType.forEach(item =>{
    if(item.classList.contains('active')){
      item.classList.remove('active')
    }
  });
  e.target.classList.add('active');
  filterData = data.filter(item => item.種類代碼 === e.target.dataset.type);
  init();
}

function searchCrop(){
  btnType.forEach(item =>{
    if(item.classList.contains('active')){
      item.classList.remove('active')
    }
  });
  if(!crop.value){return}
  showList.innerHTML = `<tr>
  <td colspan="7" class="loading text-center p-3">資料載入中...</td>
  </tr>`;
  cropName.innerHTML = `<span>以下是「${crop.value}」的比價結果</span>`;
  filterData = data.filter(item => {
    if(item.作物名稱){
      return item.作物名稱.match(crop.value)
    }
  });
  if(filterData.length > 0){
    init();
  } else{
    showList.innerHTML = `<tr>
    <td colspan="7" class="text-center p-3">查詢不到當日的交易資訊ＱＱ</td>
    </tr>`;
  }
  crop.value='';
  }

function sortData(e){
  switch(e.target.value){
    case '依上價排序':
      filterData.sort((a, b)=> b.上價 - a.上價);
      break;
    case '依中價排序':
      filterData.sort((a, b)=> b.中價 - a.中價);
      break;
    case '依下價排序':
      filterData.sort((a, b)=> b.下價 - a.下價);
      break;
    case '依平均價排序':
      filterData.sort((a, b)=> b.平均價 - a.平均價);
      break;
    case '依交易量排序':
      filterData.sort((a, b)=> b.交易量 - a.交易量);
      break;
  }
  e.target.value = '排序篩選'
  init();
}

function sortArrowData(e){
  if(e.target.nodeName !== 'I'){return}
  let price = e.target.dataset.price;
  if(e.target.classList.contains('fa-caret-up')){
    filterData.sort((a,b)=> b[price] -a[price])
  }else if(e.target.classList.contains('fa-caret-down')){
    filterData.sort((a,b)=> a[price] -b[price])
  }
  init();
}

btnGroup.addEventListener('click', categoryData);
crop.addEventListener('change', searchCrop);
cropBtn.addEventListener('click', searchCrop);
select.addEventListener('change', sortData);
sortArea.addEventListener('click', sortArrowData);