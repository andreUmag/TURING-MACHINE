function reader(x = 300) {
    var canvas = document.getElementById("canvas2");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      // crearFlecha(ctx, x);
      ctx.fillStyle = "#383673";
      ctx.fill();
      ctx.strokeStyle ="blue";
      ctx.strokeRect(x-5, 5,65, 60);

      
    }
}

function crearFlecha(ctx, x){
    ctx.beginPath();
    ctx.moveTo(x+15,100);
    ctx.lineTo(x+40,100);
    ctx.lineTo(x+25,75);
    ctx.closePath();
}