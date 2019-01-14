/* Javascript for Perspective Paralleled Text */

var bg = document.querySelector(".background");
var welcome = document.querySelector(".welcome");
var header = document.querySelector(".header");
var description = document.querySelector(".description");
var buttonWrapper = document.querySelector(".button-wrapper");
var textWrapper = document.querySelector(".text-wrapper");

var width = window.innerWidth || document.documentElement.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight;

document.addEventListener("mousemove", rotate);

var transformLayers = [
  {
    el: textWrapper,
    parallax: 13,
    rotate: true
  },
  {
    el: welcome,
    parallax: 19
  },
  {
    el: header,
    parallax: 25
  },
  {
    el: description,
    parallax: 10
  },
  {
    el: buttonWrapper,
    parallax: 27
  }
];

const bgTranslate = 300;
const bgRotate = 5;

var hScale = (height+bgTranslate)/height;
var wScale = (width+bgTranslate)/width;
const scale = hScale > wScale ? hScale : wScale;

function rotate(e){
  var lerpX = e.pageX/width;
  var offsetX = 0.5 - Math.pow(lerpX, 2); //cursor position X
  var lerpY = e.pageY/height;
  var offsetY = 0.5 - Math.pow(lerpY, 2); //cursor position Y

  for (var i=0; i<transformLayers.length; i++){
    var parallax = transformLayers[i].parallax;

    //transform
    var transform;
    if (transformLayers[i].rotate){
      transform =
      "rotateX(" + -offsetY * parallax +
      "deg) rotateY(" + -offsetX * parallax * 2 +
      "deg)";
    } else {
      transform =
      "translate3d(" + offsetX * parallax + "px, " +
      offsetY * parallax + "px, 20px";
    }
    transformLayers[i].el.style.transform = transform;
  }

//pan background
  var bgTransform =
  "translate3d(" + offsetX * bgTranslate + "px, " +
  offsetY * bgTranslate + "px, 20px) rotateX(" +
  -offsetY * bgRotate + "deg) rotateY(" + -offsetX * bgRotate +
  "deg) scale(" + scale + ")";
  bg.style.transform = bgTransform;

}
