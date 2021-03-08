let nimg=0;
let linkImgs ="https://placeimg.com/250/150/";
function addImg(){
    nimg++;
    document.getElementById("numImg").innerText=nimg;
    let newImg=`${linkImgs}${nimg}`;
    const imgElem = document.createElement("img");
    const divElem = document.getElementById("divImgs");
    imgElem.id=nimg;
    imgElem.src =newImg;
    divElem.appendChild(imgElem);
}
function rmImg(){
    const divElem = document.getElementById("divImgs");
    if(nimg>0){
        nimg--;
        document.getElementById("numImg").innerText=nimg;
        let randomNumer=Math.floor(Math.random()*divElem.children.length);
        divElem.children[randomNumer].remove();
    }
}
