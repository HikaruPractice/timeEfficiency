
let intervalID="";
let startTime=null;
let nowTime=null;
let operatingTime=new Date(startingTimeSerial);
let stopTime=null;
let restartTime=null;
let executionTime=new Date(startingTimeSerial);
let times=0;
let ave=new Date(startingTimeSerial);
let perMinute=0;
let perHour=0;
let breaking = false;
let nowBreakTime=new Date(startingTimeSerial);
let totalBreakTime=new Date(startingTimeSerial);
let allBreakTime=new Date(startingTimeSerial);

let preBreakTime=new Date(startingTimeSerial);

function start(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
    document.getElementById("countDisplay").disabled=false;
    document.getElementById("countMinus").disabled=false;
    startTime = new Date();
    intervalID=setInterval(update,500);
}

function restart(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
    restartTime = new Date();
    setTimeDifference(preBreakTime,stopTime,restartTime);
    totalBreakTime = timeAdd(totalBreakTime,preBreakTime);
    allBreakTime.setTime(totalBreakTime.getTime());
    breaking=false;
}


function fin(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="block";
    document.getElementsByClassName("stop")[0].style.display="none";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = false;


    stopTime=new Date();
    update();
    
    breaking=true;
}

function reset(){
    document.getElementsByClassName("start")[0].style.display="block";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="none";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = false;
    document.getElementById("countDisplay").disabled=true;
    document.getElementById("countMinus").disabled=true;
    clearInterval(intervalID);
    intervalID="";
    breaking=false;

    startTime=null;
    nowTime=null;
    operatingTime.setTime(startingTimeSerial);
    stopTime=null;
    restartTime=null;
    executionTime.setTime(startingTimeSerial);
    times=0;
    ave=0;
    perMinute=0;
    perHour=0;
    nowBreakTime.setTime(startingTimeSerial);
    totalBreakTime.setTime(startingTimeSerial);
    allBreakTime.setTime(startingTimeSerial);

    preBreakTime.setTime(startingTimeSerial);

    document.getElementById('dot').style.color='white';
    document.getElementById('operatingTime').innerText="";
    document.getElementsByClassName('countDisplay')[0].textContent=0;
    document.getElementById('perMinute').textContent=0;
    document.getElementById('perHour').textContent=0;

}


function setOperatingTime(){
    if (toString.call(operatingTime) !== '[object Date]'){
        return;
    }
    operatingTime=timeSub(executionTime,allBreakTime);
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

// function setBreakTime(){
//     if (typeof startTime === 'undefined'){
//         return;
//     }
//     breakTimeSerial = nowTime.getTime() - stopTime.getTime();
//     operatingTime = new Date(startingTimeSerial+operatingTimeSerial);
//     let timeArr=timeToArr(operatingTime);
//     let text;
//     if (timeArr[3]>=1){
//         text=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
//         if (timeArr[0]<500){
//             document.getElementById('dot').style.color='black';
//         }else{
//             document.getElementById('dot').style.color='white';
//         }
//     }else{
//         text=( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
//     }
//     let span = document.gsetElementById('operatingTime');
//     span.innerText=text;
// }



function timesAdd(n){
    times+=n;
    document.getElementsByClassName('countDisplay')[0].textContent=times;
    if(breaking){
    setAverage();
    setPerHour();
    }
}

function setAverage(){
    
    if (toString.call(operatingTime) !== '[object Date]'){
        return;
    }
    if (times<=0){
        document.getElementById('averageTime').textContent=0;
        ave.setTime(startingTimeSerial);
        return;
    }
    let aveTimeSerial
    aveTimeSerial=(operatingTime.getTime()-startingTimeSerial)/times+startingTimeSerial;
    ave.setTime(aveTimeSerial);
    let timeArr=timeToArr(ave);
    let text;
    if (timeArr[3]>=1){
        text=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
    }else if(timeArr[2]>=1){
        text=( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    }    else{
        text=( '00' + timeArr[1] ).slice( -2 )+"s";
    }
    document.getElementById('averageTime').textContent=text;
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
    nowTime= new Date();
    setTimeDifference(executionTime,startTime,nowTime);
    //setOperatingTime();
    if (breaking){
        setTimeDifference(nowBreakTime,stopTime,nowTime);
        allBreakTime=timeAdd(totalBreakTime,nowBreakTime);
    }else{
    
        setOperatingTime();
    setAverage();
    setPerHour();
    }
    debug();
}


function debug(){
    let timeArr;
    timeArr =timeToArr(startTime);
    gei('startTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";
    timeArr =timeToArr(nowTime);
    gei('nowTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";
    timeArr =timeToArr(executionTime);
    gei('proccec').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(stopTime);
    gei('breakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";
    timeArr =timeToArr(restartTime);
    gei('restartTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";

        timeArr=timeToArr(preBreakTime)
        gei('preBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
        
    timeArr =timeToArr(nowBreakTime);
    gei('nowBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(totalBreakTime);
    gei('totalBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(allBreakTime);
    gei('allBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(operatingTime);
    gei('opeTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
}

function gei(id){
    return document.getElementById(id)
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

