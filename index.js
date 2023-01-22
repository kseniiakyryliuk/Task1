// для id має бути унікальне ім'я. Рахувач, збільшується на одиничку при добавленні рядка 
let curIndex = 0;
    const generateRowId = () => {
        curIndex ++;
        return `${curIndex}`;
    }

const add = document.getElementById("add");
add.addEventListener('click', addElements);
function addElements(){
   let number = generateRowId();
   lastRow(number-1);
   if (number<7)
 {  let div = document.createElement('div');
     let secDiv = document.createElement('div');
    div.innerHTML = ` <div class="main-div" id="row_${number}">
  <div class="all">
    <button onclick ="remove(this)" id="remove"><img src="del.jpg" width="25px" height="25px"></button>  
     <input type="time" class="time_from" placeholder="Time from" value="">
    <input type="time" class="time_to" placeholder="Time to" value="">

    <div class="allDays">
    <div class="days">
       <label class="one_day">
          <span class="monday">Пн</span>
            <input type="checkbox" class="checkbox" value="0" name="values"  onchange="refreshCheckbox(this)">  
        </label>
    </div>
    
    <div class="days">
        <label class="one_day">
          <span class="tuesday">Вт</span>
            <input type="checkbox" class="checkbox" value="1" name="values"  onchange="refreshCheckbox(this)">  
        </label>
    </div>
    
    <div class="days">
        <label class="one_day">
          <span class="wednesday">Ср</span>
            <input type="checkbox" class="checkbox" value="2" name="values"  onchange="refreshCheckbox(this)">  
        </label>
    </div>
    
    <div class="days">
        <label class="one_day">
          <span class="thursday">Чт</span>
            <input type="checkbox" class="checkbox" value="3" name="values"  onchange="refreshCheckbox(this)">  
        </label>
    </div>
    
    <div class="days">
        <label class="one_day">
          <span class="friday">Пт</span>
            <input type="checkbox" class="checkbox" value="4" name="values"  onchange="refreshCheckbox(this)">  
        </label>
    </div>
    
    <div class="days">
          <label class="one_day">
          <span class="saturday">Сб</span>
            <input type="checkbox" class="checkbox" value="5" name="values"  onchange="refreshCheckbox(this)">  
        </label>
    </div>
    
    <div class="days">
        <label class="one_day">
          <span class="sunday">Нд</span>
            <input type="checkbox" class="checkbox" value="6" name="values"  onchange="refreshCheckbox(this)">  
        </label>
     </div>   
  </div>
           <div class="error" id="error_${number}">*Введіть коректні дані</div> 
           
  </div>
            
</div>
`
    document.querySelector('.others').appendChild(div);
    refreshCheckbox()
  }
  else
{
  add.disabled=true;
 }
} 

const remove = (item) => {
  curIndex--; item.parentNode.remove(); refreshCheckbox();  add.disabled=false;
}




const submit = document.getElementById('submit');
submit.addEventListener('click', onSubmit);

function onSubmit(){
  const indexList = [];
  const rows = document.getElementsByClassName("main-div");
      for (let i = 0; i < rows.length; i++) { 
         const row = rows[i];
         const rowsOfCheckboxes = row.getElementsByClassName("checkbox");
         const days = collectActiveDays(rowsOfCheckboxes);
   
       
          const valueOfFirst = row.getElementsByClassName("time_from");
         const valueOfSecond = row.getElementsByClassName("time_to");
         const hours=collectHours(valueOfFirst, valueOfSecond);
         const rowData = {    
             days,
            hours,
         };
     const error = row.getElementsByClassName("error");

         for(let i = 0; i < error.length; i++){
          if(rowData.hours[1] < rowData.hours[0] || rowData.hours[1] === rowData.hours[0] || rowData.hours[0] == '' || rowData.hours[1] == ''||days.length==0)
          {
              error[i].style.display = 'block';
          }
          else{
            error[i].style.display = 'none';
          }
      }

         indexList.push(rowData); 
        } 

        localStorage.setItem('list',JSON.stringify(indexList));

           }

function lastRow(number) {
  const rows = document.getElementsByClassName("main-div");
  let row = rows[number];

  let rowsOfCheckboxes = row.getElementsByClassName("checkbox");
  let days = collectActiveDays(rowsOfCheckboxes);

   
    let valueOfFirst = row.getElementsByClassName("time_from");
    let valueOfSecond = row.getElementsByClassName("time_to");
     let hours=collectHours(valueOfFirst, valueOfSecond);
     let rowData = {    
         days,
        hours,
     };

   let error=document.getElementById(`error_${number}`);
 if(rowData.hours[1] < rowData.hours[0] || rowData.hours[1] === rowData.hours[0] || rowData.hours[0] == '' || rowData.hours[1] == ''||days.length==0)
  {
      error.style.display = 'block';
  }
  else{
    error.style.display = 'none';
  }

}



      function collectHours(fromList,toList){
        const hours = [];
        for(let i = 0; i < fromList.length; i++){
            for(let j = 0; j < toList.length; j++){
            hours.push(fromList[i].value, toList[j].value);
            }
        }
        return hours;
    }
   


function collectActiveDays(arrayOfDays){
const activeDays=[];
for (let i = 0; i < arrayOfDays.length; i++) {
  if(arrayOfDays[i].checked) activeDays.push(+arrayOfDays[i].value);  
}
return  activeDays;
}




function refreshCheckbox(){
    let checkedIndex = [];
    const cboxes = document.getElementsByClassName('checkbox');
    for(let i = 0; i < cboxes.length; i++){
        if(cboxes[i].checked){
            checkedIndex.push(+cboxes[i].value);
        }
    }
     checkedIndex = Array.from(new Set((checkedIndex)));
    for(let i = 0; i < cboxes.length; i++){
        cboxes[i].disabled = !cboxes[i].checked && checkedIndex.includes(+cboxes[i].value);
    }
    
}