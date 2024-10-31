import React, { useState } from 'react'
import './input.css'
export default function Input() {
  const [ip,changeip]=useState({
    ip1:0,
    ip2:0,
    ip3:0,
    ip4:0,
    class:'invalid',

    subnetglobal:''
  });
  function check(e) {

    if((+e.target.value)>255){
      changeip({...ip,class:'invalid'})
    }else if((+e.target.value)>-1){
    changeip({...ip,[e.target.name]:e.target.value});}
  }
  let closesubnet=[];
  let maxsubnet=[];
  function rangecalculate() {
    let k =h;
    let i=1;
    let power=0;
    while((+k)>Math.pow(2,i)-2){
      i++;
    }
    power=i;
    let n=0;
    let subnetbinary = new Array(31).fill(1);

    while (n<i) {
      subnetbinary[31-n]=0;
      n++;
    }
    n=0;
    while (n<i) {
      subnetbinary[n]=1;
      n++;
    }
    let result  = [];

    let reversedArray=[];
    for (let i = 0; i < subnetbinary.length; i += 8) {
      const chunk = subnetbinary.slice(i, i + 8);
      result.push(chunk);
  }
  for (let i = 0; i < result.length; i++) {
    for (let j = result[i].length-1; j > -1; j--) {
      reversedArray.push(result[i][j]);

    }

  }
  result  = [];
  for (let i = 0; i < reversedArray.length; i += 8) {
    const chunk = reversedArray.slice(i, i + 8);
    result.push(chunk);
}
let finalsubnet=[];
let s=0;
for (let i = 0; i < result.length; i ++) {
  for (let j = 0; j < result[i].length; j++) {
    s += result[i][j]*Math.pow(2,j);
  }
  finalsubnet.push(s);
  s=0;
}

let ourip=[ip.ip1,ip.ip2,ip.ip3,ip.ip4];
for (let i = 0; i < finalsubnet.length; i ++ ) {
  closesubnet[i]=finalsubnet[i]&ourip[i];
}

maxsubnet=[...closesubnet];
maxsubnet[3]=closesubnet[3]+Math.pow(2,power)-1
return finalsubnet;
 }


const [h,seth]=useState('');

const handleInputChange = ( value) => {
  if((+value)>254){

  }else if(+value>-1){
  seth(value);}
};
rangecalculate();




if( -1<(+ip.ip1)&&(+ip.ip1)<128){
  ip.class='a'
  ip.subnetglobal='255.0.0.0'
}else if(127<(+ip.ip1)&&(+ip.ip1)<192 ){
  ip.class='b'
  ip.subnetglobal='255.255.0.0'
}else if(191<(+ip.ip1)&&(+ip.ip1)<224 ){
  ip.class='c'
  ip.subnetglobal='255.255.255.0'
}else{
  ip.class='invalid'
  ip.subnetglobal='invalid'
}


  return (
    <div className='inputs' style={{padding:'15px'}}>
      <h1>IPV4 Calculator</h1>
      <div style={{ fontWeight:'bold' , color:(ip.class!=='invalid')?'rgb(60, 179, 113)':'rgb(255, 99, 71)'}}>Class({ip.class}) </div>
      <div style={{ fontWeight:'bold' , color:(ip.class!=='invalid')?'rgb(60, 179, 113)':'rgb(255, 99, 71)'}}>IP subnetMask({ip.subnetglobal}) </div>
      <br></br>

      <form name='ipv4' >

      <input type="number"  name='ip1' maxLength='3' max="255"  min="0" value={ip.ip1} onChange={check} />
      .
      <input type="number" name='ip2' maxLength='3'  max="255"  min="0"value={ip.ip2} onChange={check}/>
      .
      <input type="number" name='ip3' maxLength='3'  max="255"  min="0" value={ip.ip3} onChange={check}/>
      .
      <input type="number" name='ip4' maxLength='3'  max="255"  min="0" value={ip.ip4} onChange={check}/>



      </form>

      <form>
        <p>Hosts Number:</p>

        <input

          type="number"
          value={h}
          onChange={(e) => handleInputChange(e.target.value)}
          maxLength='3'
          max="255"  min="0"
        />



      </form>
      {ip.class!=='invalid' && <>
      <div> Subnet Network subnetmask :<strong> -{rangecalculate().join('.')}-</strong></div>
    <div> Range <strong> -{closesubnet.join('.')}- ➜ -{maxsubnet.join('.')}-</strong> </div>
   <hr></hr>

    <span style={{backgroundColor:'rgb(255, 165, 0)',padding:'10px'}}><strong>the adresses typed are the broadcast and the network adress you can take any adress between them</strong></span>
    </> }

    </div>
  )
}
