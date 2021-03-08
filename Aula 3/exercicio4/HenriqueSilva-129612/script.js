// Your JS Script here

let imgCounter=0;

function addImage(){

  imgCounter++;
  let img = document.createElement("img")
  img.src="https://placeing.com/250/158" + imgCounter

  const images = document.getElementById("imageContainer")
  images.appendChild(img);
}

function  removeImage(){

}
