<template>
<!--  <canvas  @onmousemove="onMouseDraw(event)" id="canvas">
  </canvas>-->
  <canvas  @mousemove="onMouseDraw" id="canvas">
  </canvas>
</template>

<script>

    export default {
        name: "CanvsBackground",
      data(){
          return{
            canvas:'',
            WIDTH : '',
            HEIGHT: '',
            POINT:40,
            context: '',
            circleArr:[],
          }
      },
      mounted(){
          this.canvas = document.getElementById('canvas');
          this.WIDTH = window.innerWidth;
          this.HEIGHT = window.innerHeight;
          this.context = this.canvas.getContext('2d');
          this.canvas.width = this.WIDTH;
          this.canvas.height = this.HEIGHT;
          this.context.strokeStyle = 'rgba(242,244,255,0.1)';
          this.context.strokeWidth = 1;
          this.context.fillStyle = 'rgba(242,244,255,0.1)';
          this.startDo();
      },
      methods: {
        startDo(){

          window.onload =()=> {
            this.init();
            setInterval(()=> {
              for (var i = 0; i < this.POINT; i++) {
                var cir = this.circleArr[i];
                cir.x += cir.moveX;
                cir.y += cir.moveY;
                if (cir.x > this.WIDTH) cir.x = 0;
                else if (cir.x < 0) cir.x = this.WIDTH;
                if (cir.y > this.HEIGHT) cir.y = 0;
                else if (cir.y < 0) cir.y = this.HEIGHT;
              }
              this.draw();
            }, 16);
          }
        },
        getStyles(obj){//兼容FF，IE10; IE9及以下未测试
          return document.defaultView.getComputedStyle(obj);
        },
        getCanvasPos(canvas,e){
          var rect = canvas.getBoundingClientRect();
          var leftB = parseInt(this.getStyles(canvas).borderLeftWidth);//获取的是样式，需要转换为数值
          var topB = parseInt(this.getStyles(canvas).borderTopWidth);
          return {
            x: (e.clientX - rect.left) - leftB,
            y: (e.clientY - rect.top) - topB
          };
        },
        onMouseDraw(e){

          this.circleArr.push(this.drawCricle(this.context, this.getCanvasPos(this.canvas,e).x,this.getCanvasPos(this.canvas,e).y, this.num(15, 2), this.num(10, -10)/10, this.num(10, -10)/10));
          let pos = this.num(40,0);
          this.circleArr.splice(pos,1);

        },
        Line (x, y, _x, _y, o) {
          this.beginX = x;
            this.beginY = y;
            this.closeX = _x;
            this.closeY = _y;
            this.o = o;
        },
        Circle (x, y, r, moveX, moveY) {
          this.x = x;
            this.y = y;
            this.r = r;
            this.moveX = moveX;
            this.moveY = moveY;
        },
        num (max, _min) {
          var min = arguments[1] || 0;
          return Math.floor(Math.random()*(max-min+1)+min);
        },
        drawCricle (cxt, x, y, r, moveX, moveY) {
          const circle = new this.Circle(x, y, r, moveX, moveY);
          cxt.beginPath();
          cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
          cxt.closePath();
          cxt.fill();
          return circle;
        },
        drawLine (cxt, x, y, _x, _y, o) {
          var line = new this.Line(x, y, _x, _y, o);
          cxt.beginPath();
          cxt.strokeStyle = 'rgba(225,225,225,'+ o +')';
          cxt.moveTo(line.beginX, line.beginY);
          cxt.lineTo(line.closeX, line.closeY);
          cxt.closePath();
          cxt.stroke();

        },
        init () {
          //circleArr = [];
          for (var i = 0; i < this.POINT; i++) {
            this.circleArr.push(this.drawCricle(this.context, this.num(this.WIDTH), this.num(this.HEIGHT), this.num(15, 2), this.num(10, -10)/10, this.num(10, -10)/10));
          }
          this.draw();
        },
        draw () {
          this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
          for (var i = 0; i < this.POINT; i++) {
            this.drawCricle(this.context, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i].r);
          }
          for (var i = 0; i < this.POINT; i++) {
            for (var j = 0; j < this.POINT; j++) {
              if (i + j < this.POINT) {
                var A = Math.abs(this.circleArr[i+j].x - this.circleArr[i].x),
                  B = Math.abs(this.circleArr[i+j].y - this.circleArr[i].y);
                var lineLength = Math.sqrt(A*A + B*B);
                var C = 1/lineLength*7-0.009;
                var lineOpacity = C > 0.1 ? 0.1 : C;
                if (lineOpacity > 0) {
                  this.drawLine(this.context, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i+j].x, this.circleArr[i+j].y, lineOpacity);
                }
              }
            }
          }
        }
      }
    }
</script>

<style scoped>
  canvas{
  text-align: center;
/*  background: #F7FAFC;*/
  background: url("../assets/blur-bg.jpg");
  overflow: hidden;
/*  background: rgba(242,244,255,1);*/

}
</style>
