function localSave(){
    localStorage.setItem('times',times);
    localStorage.setItem('breaking',breaking);
    if (startTime !== null){
        localStorage.setItem('startTime',startTime.getTime());
    }
    if (stopTime !== null){
        localStorage.setItem('stopTime',stopTime.getTime());
    }
    if (restartTime !== null){
        localStorage.setItem('restartTime',restartTime.getTime());
    }
    localStorage.setItem('executionTime',executionTime.getTime());
    localStorage.setItem('totalBreakTime',totalBreakTime.getTime());
}
function localSave_ifChecked(){
    if (!document.getElementById('checkbox').checked){
        localSave();
    }
}

function localLoad(){
    reset(true);
    let temp;
    breaking=JSON.parse(localStorage.getItem('breaking'));
    if (breaking === null){
        return;
    }
    times=Number(localStorage.getItem('times'));
    temp = localStorage.getItem('startTime');
    if (temp==='null'){
        startTime=null
    }else{
        startTime=new Date(Number(temp));
    }
    temp = localStorage.getItem('stopTime');
    if (temp==='null'){
        stopTime=null
    }else{
        stopTime=new Date(Number(temp));
    }
    temp = localStorage.getItem('restartTime');
    if (temp==='null'){
        restartTime=startTime;
    }else{
        restartTime=new Date(Number(temp));
    }
    executionTime.setTime(Number(localStorage.getItem('executionTime')));
    totalBreakTime.setTime(Number(localStorage.getItem('totalBreakTime')));
    if (executionTime.getDate()>1){
        reset();
        return;
    }
    timesAdd(0);
    if(breaking){
        fin2();
    }else{
        restart2();
    }
    document.getElementById("countDisplay").disabled=false;
    document.getElementById("countMinus").disabled=false;
    update2();
    intervalID=setInterval(update,500);
}
function localRemove(){
    localStorage.clear();
}

function restart2(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
}
function fin2(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="block";
    document.getElementsByClassName("stop")[0].style.display="none";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = false;

}

function update2(){
    nowTime= new Date();
    setTimeDifference(executionTime,startTime,nowTime);

    if (breaking){
        setTimeDifference(nowBreakTime,stopTime,nowTime);
        allBreakTime=timeAdd(totalBreakTime,nowBreakTime);
    }else{
        allBreakTime.setTime(totalBreakTime);
    }
    setOperatingTime();
    setAverage();
    setPerHour();
    displayTime();
    //debug();
}

function checkboxChenge(){
    if (document.getElementById('checkbox').checked){
        localRemove();
    }else{
        localSave();
    }
}