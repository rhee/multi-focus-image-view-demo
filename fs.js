var MFZ=function(el){
  var _=this;
  _.el=el;
  _.ox=-(0|parseInt(el.style.width)/2);
  _.oy=-(0|parseInt(el.style.height)/2);
  _.end(0);
};
MFZ.prototype.handleEvent=function(event){
  var _=this,el=event.target;
  if('webkitTransitionEnd'==event.type&&el==_.el){
    _.end(0);
  }
};
MFZ.prototype.start=function(x,y,t,s){
  var _=this,el=_.el,xx=x+_.ox,yy=y+_.oy;
  console.log('MFZ.start '+[x,y,t,s,'=>',xx,yy].join(' '));
  //show, fade-out
  el.style.left=xx+'px';
  el.style.top=yy+'px';
  el.addEventListener('webkitTransitionEnd',_,true);
  el.className='cc-fade';
};
MFZ.prototype.end=function(t){
  console.log('MFZ.end('+t+')');
  var _=this,el=_.el;
  el.removeEventListener('webKitTransitionEnd',_,true);
  //moving the div out of the container
  //(changing style.display or style.zOrder not works as expected)
  el.style.left=-1000+'px';
  el.style.top=-1000+'px';
  el.className='';
}

var MFV=function(el){
    var _=this,i,j,o,l,n,r=/url\((.*)\)/i;
    _.el=el;
    _.ic=[];//image cache
    _.fm={};//focus map ( element to level )
    _.ii=document.querySelectorAll('.ii');//div array
    for(i=0;i<_.ii.length;i++){
      //console.log('processing '+_.ii[i].id+'.'+_.ii[i].className);
      //preload
      _.ic.unshift(new Image());
      _.ic[0].src=r.exec(_.ii[i].style.backgroundImage)[1];//get url
      //console.log('src='+_.ic[0].src);
      //selection area
      l=document.querySelectorAll('.sel-'+_.ii[i].id);
      for(j=0;j<l.length;j++){
        var n=l[j];
        n.addEventListener('click',_,true);
        _.fm[n.id]=i;
        //console.log('listener '+n.id+'.'+n.className+' '+i);
      }
    }
    //cursor div
    _.cc=new MFZ(document.getElementById('cc'));
    _.set_focus_level(0);
};
MFV.prototype.handleEvent=function(event){
  var _=this;
  var el=event.target;
  if('click'==event.type){
    console.log('click '+el.id+'.'+el.className+' '+[el.offsetLeft,el.offsetTop,event.offsetX,event.offsetY].join(' '));
    var x=el.offsetLeft+event.offsetX;
    var y=el.offsetTop+event.offsetY;
    _.cc.start(x,y,0.5,0.5);
    _.set_focus_level(_.fm[el.id]);
  }
};
MFV.prototype.set_focus_level=function(n){
  console.log('focus '+n);
  var _=this,i;
  for(i=_.ii.length-1;i>n;i--){
    if(_.ii[i].className!='ii unfocused')
      _.ii[i].className='ii unfocused';
    //console.log(''+i+' '+_.ii[i].className);
  }
  for(i=n;i>=0;i--){
    if(_.ii[i].className!='ii focused')
      _.ii[i].className='ii focused';
    //console.log(''+i+' '+_.ii[i].className);
  }
};

function onLoad(){
  window.multiFocus=new MFV(
    document.getElementById('imggroup'));
}
