const startingTimeSerial = new Date("0001",1,1,0,0,0,0).getTime();
let intervalID="";
let startTime;
let nowTime;
let operatingTime;
let times=0;
let ave=0;
let perMinute=0;
let perHour=0;


function fin(){
    clearInterval(intervalID);
    intervalID="";
    update();
}

function setStartTime(){
    if (intervalID==!""){
        return;
    }
    startTime = new Date();
    let span = document.getElementById('startTime');
    let timeArr =timeToArr(startTime);
    span.textContent=( '00' + timeArr[3] ).slice( -2 )+":"+( '00' + timeArr[2] ).slice( -2 );
    let span2 = document.getElementById('operatingTime');
    span2.textContent="00m00s";
    intervalID=setInterval(update,500);
}

function setNowTime(){
    nowTime= new Date();
}

function setOperatingTime(){
    if (typeof startTime === 'undefined'){
        return;
    }
    let operatingTimeSerial = nowTime.getTime() - startTime.getTime();
    operatingTime = new Date(startingTimeSerial+operatingTimeSerial);
    let timeArr=timeToArr(operatingTime);
    let text;
    if (timeArr[3]>=1){
        text=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
        if (timeArr[0]<500){
            document.getElementById('dot').style.color='black';
        }else{
            document.getElementById('dot').style.color='white';
        }
    }else{
        text=( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    }
    let span = document.getElementById('operatingTime');
    span.innerText=text;
}

function timeToArr(DateObject){
    //[FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds]
    let arr = [];
    arr[0]=DateObject.getTime() % 1000;
    if (arr[0]<0){
        arr[0]+=1000;
    }
    arr[1]=DateObject.getSeconds();
    arr[2]=DateObject.getMinutes();
    arr[3]=DateObject.getHours();
    arr[4]=DateObject.getDate();
    arr[5]=DateObject.getMonth();
    arr[6]=DateObject.getFullYear();
    return arr;
}

function timeFormat(DateObject,jikan = false){
    let hours;
    let minutes = DateObject.getMinutes();
    let seconds = DateObject.getSeconds();
    if (jikan){
        hours = Math.floor((DateObject.getTime()-new Date(0001,1,1).getTime())/60/60/1000);
        if(hours>0){
            return hours+'時間'+minutes+'分'+seconds+'秒';
        }else if(minutes>0){
            return minutes+'分'+seconds+'秒';
        }else if(seconds>=0){
            return seconds+'秒';
        }else{
            return 0;
        }
    }else{
        hours = DateObject;
        return hours.getHours().toString().padStart(2,'0')+'時'+minutes.toString().padStart(2,'0')+'分'+seconds.toString().padStart(2,'0')+'秒';
    }
}

function timesAdd(n){
    times+=n;
    document.getElementsByClassName('countDisplay')[0].textContent=times;
    setAverage();
    setPerHour();
}

function setAverage(){
    
    if (typeof operatingTime === 'undefined'){
        return;
    }
    if (times<=0){
        document.getElementById('averageTime').textContent=0;
    }
    let time = operatingTime.getTime()-startingTimeSerial;
    ave = new Date((time/times)+startingTimeSerial);
    document.getElementById('averageTime').textContent=timeFormat(ave,true);
}

function setPerHour(){
    if (typeof operatingTime === 'undefined'){
        return;
    }
    if (times<=0){
        document.getElementById('perHour').textContent=0;
    }
    let minute = (operatingTime.getTime()-startingTimeSerial)/1000/60;
    let hour = minute/60;
    perMinute = times/minute;
    perHour = times/hour;
    document.getElementById('perMinute').textContent=Math.floor(perMinute*10)/10;
    document.getElementById('perHour').textContent=Math.floor(perHour*10)/10;
}

function update(){
    setNowTime();
    setOperatingTime();
    setAverage();
    setPerHour();
}

function test(){
    alert(timeFormat (new Date(startingTimeSerial+10000000)));
    alert(timeFormat (new Date(startingTimeSerial+10000000),true));
}



// 没　時間単位変換　Date型に100分と指定すると1時40分と解釈される仕様を使えばいい

// function timeUnitConvert(num,from){
//     let units =  ['ms','s','min','h','d'];
//     let packAmount = [1000,60,60,24,30];
//     let ans=[0,0,0,0,0]
//     let start;
//     for (let i = 0;i<units.length;i++){
//         if (units[i] === from){
//             start = i;
//             break;
//         }
//     }
//     ans[start] = num
//     for (let i = start;i<units.length-1;i++){
//         ans[i+1] = Math.floor(ans[i]/packAmount[i]);
//         ans[i] = ans[i]-ans[i+1]*packAmount[i];
//     }
//     console.log(num.toString() + from);
//     console.log(ans);
//     let ansDate = new Date(2000,1,1,ans[3],ans[2],ans[1],ans[0])
//     console.log(timeFormat(ansDate));
//     console.log(timeFormat(new Date(0000,1,1,0,0,num)));
    
// }