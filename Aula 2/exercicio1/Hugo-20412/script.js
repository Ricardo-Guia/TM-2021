// Your JS Script here

changeText=()=>{
   const textLabel= document.getElementById("text");
   const input= document.getElementById("input");
   if(input.value==="" ){
       alert("Caixa de texto vazia")
       
   }
   textLabel.textContent=input.value;
}