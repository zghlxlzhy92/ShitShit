var x="" ;
var p_velocity=0;
var level;
var down=[];
var up=[];
var move;
var butt=document.getElementById("butt");
var pot=document.getElementById("pot");
var start=document.getElementsByClassName("start");
var win=document.getElementById("win");
var miss=document.getElementById("miss");
var compare=document.getElementById("compare");
var shit=document.getElementsByClassName("shit")
var p_1=[];
var quit=document.getElementById("Quit");
var success=0;
var Miss=0;
var clock=document.getElementById("clock");
var set;
var i=0;
var spark=0;
window.onmousemove=function(event)
{  x=event.clientX;
   if(x>=400&&x<=1150)
   {
    butt.style.left=(parseInt(x)-400)+"px";
   }
    else
   {
   	  if(x<400)
   	  {
   	  	   butt.style.left=0+"px";

   	  }
    	  else
   	  {
    	  	butt.style.left=750+"px";
   	  }
    }
   

   
}

var movePot=function(m){
  
    p_velocity+=Math.random()*(2*(m+1));
    pot.style.left=(parseInt(p_velocity))+"px";
    var left=parseInt(pot.style.left.replace("px",""));
    if(left>550)
    {  
       p_velocity=0;
       pot.style.left="-180px";

    }
}
var gameon=function(k)
{ return function()   
   { win.innerHTML=0;
     miss.innerHTML=0;
    clock.innerHTML=60;
    if(spark==0){
    spark=1;
    move=setInterval(movePot,10,k);
    set=setInterval(function(){
    clock.innerHTML--;
    if(clock.innerHTML==0)
    { 
      clock.innerHTML="Game Over";
      clearInterval(set);
      exit();

    }

    },1000);
    }
   }
  }
var moveShitUp=function(l)
{   
    var x_velocity=1;
        y_velocity=3;
    var p_x=[];
    var p_y=[];
      p_x[l]=parseInt(p_1[l].style.left.replace("px",""));
      p_y[l]=parseInt(p_1[l].style.top.replace("px",""));
    p_1[l].style.left=p_x[l]+x_velocity+"px";
    p_1[l].style.top=p_y[l]-y_velocity+"px";
    if(p_y[l]<105)
    { 
      clearInterval(up[l])//////
      down[l]=setInterval(moveShitDown,10,l);
      
    }
}
var seeResult=function(r)
{  var p_1x=[];
   var p_1y=[];
   pot_x=parseInt(pot.style.left.replace("px",""));
   p_1x[r]=parseInt(p_1[r].style.left.replace("px",""));
   p_1y[r]=parseInt(p_1[r].style.top.replace("px",""));
   
   if((p_1y[r]==115)&&((pot_x+220)<=p_1x[r])&&(p_1x[r]<=(pot_x+270)))
   {  success++;
      win.innerHTML=success;
      
      p_1[r].style.visibility="hidden";
      pot.src="potn.png";
      clearInterval(down[r]);
      setTimeout(function(){pot.src="pot.png"},30);
     }
  
}

var moveShitDown=function(q)
{  
   var y_velocity=3;
   var p_y=[];
   p_y[q]=parseInt(p_1[q].style.top.replace("px",""));
   p_1[q].style.top=p_y[q]+y_velocity+"px";
    
   seeResult(q);
   if(p_y[q]>198)
   { 
    
     clearInterval(down[q]);
     Miss++;
     miss.innerHTML=Miss;
     
   }
  

       
}
var pop=function()
{  
   var b_x=parseInt(butt.style.left.replace("px",""));
   p_1[i]=shit[i%6];
   p_1[i].style.left=b_x+40+"px";
   p_1[i].style.top=385+"px";
   p_1[i].style.visibility="visible";
   up[i]=setInterval(moveShitUp,10,i);
   i++;

}
var exit=function()
{  clearInterval(set);
   p_velocity=0;
   clearInterval(move);
   compare.innerHTML=success/(Miss+success);
   pot.style.left=-180+"px";

   pot.style.top=-20+"px";
   clock.innerHTML="";
   spark=0;
}

for(var j=0;j<start.length;j++)
{ 
  start[j].addEventListener("click",gameon(j),false);
}

butt.addEventListener("click",pop,false);
quit.addEventListener("click",exit,false);