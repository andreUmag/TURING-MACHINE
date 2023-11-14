
function tape(texto, x = 640) {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(i = 0; i < texto.length; i++){
        ctx.strokeStyle = "#7672f200";
        ctx.strokeRect(x, 10, 55, 50);
        ctx.fillStyle = "black";
        ctx.font=" 20px Poppins";
        ctx.fillText(texto.charAt(i),x + 20,40);
        ctx.strokeStyle = "#7672f200";
        ctx.opacity = "0.5";
        x += 55;
      }
    }
  }

  function tape2(texto, x = -129) {
    var canvas = document.getElementById("canvas3");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(i = 0; i < texto.length; i++){
        ctx.strokeRect(x, 10, 55, 50);
        ctx.fillStyle = "black";
        // ctx.font="bold 20px Verdana";
        ctx.fillText(texto.charAt(i),x + 20,40);
        ctx.strokeStyle = "gray";
        x += 55;
      }
    }
  }

