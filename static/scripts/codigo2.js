let check = document.getElementById("verificar");
let text;
let position;
let position2;
let tex22="                                                                                                                                                                                                                                              "
tape2(tex22);
reader();


check.onclick = ()=>{ 
    position = 640;
    position2 = -129;
    text = document.getElementById("input-word").value;
    tape(text);

    let regExp = new RegExp("[abB ]+","g");
    regExp = regExp.exec(text);
    unpaint(myDiagram, true);
    try {
        if(text == ""){
            paint_node(myDiagram.findNodeForKey(0));
        }else if(text == regExp[0]){
            tiempo2 = document.getElementById("inputSlider").value;
            tiempo = transformValorInput(tiempo2);
            check_word(text, 0, 0, tiempo);
        }else{
            // mostrarError();
        } 
    } catch (e) {
        // if(e instanceof TypeError){ mostrarError(); }
    }
}

function check_word(text, index, numNodo, tiempo) {
    let node = myDiagram.findNodeForKey(numNodo);
    unpaint_node(node);
    window.setTimeout(function(){
        paint_node(node);
        window.setTimeout(function(){
            let links = node.findTreeChildrenLinks();
                let link3 = links.ub._dataArray.filter(function (link) { return  link.fromNode == node;});
                console.log(link3);
                let link2 = links.ub._dataArray.filter(function (link) { return link.data.text[0] == "λ" && link.fromNode == node;});   
                let link = links.ub._dataArray.filter(function (link) { return link.data.text[0] == text.charAt(index) && link.fromNode == node;});   
            if(index < text.length){
                try {
                    if(link[0].data.text[0] == text.charAt(index)){
                        move_tape(index, link);
                        paint_tour(link[0]);
                        return check_word(text, index + 1, link[0].toNode.data.id, tiempo);
                    }
                } catch (error) {
                    if(error instanceof TypeError){
                        paint_tour(link2[0]);
                        move_tape(index);
                        unpaint_node(node);
                        if(index<text.length){
                            return check_word(text, index + 1, link2[0].toNode.data.id, tiempo);
                        }
                    }
                }
            }else{ 
                if(index >= text.length){
                    try {
                        paint_tour(link3[3])
                    }
                    catch (error) {
                        paint_tour(link3[2])
                    }
                }

                return rollback();  }
        }, tiempo);
    }, tiempo/10)
}



function rollback(index = 0) {   
    if (index < text.length) {
        setTimeout(() => {
            rollback2(() => rollback(index + 1));
        }, 100); // Ajusta el intervalo de tiempo (en milisegundos) entre letras
    }
}

function rollback2(callback) {
    
    let steps = 10; // Número de pasos para el movimiento suave
    let stepCount = 0;

    function moveStep() {
        if (stepCount < steps) {
            if (position < 640) {
                position += 5.5;
                position2 += 5.5;
                tape(text, position);
                tape2(tex22, position2);
            }

            stepCount++;
            window.requestAnimationFrame(moveStep);
        } else {
            stepCount = 0; // Reinicia el conteo de pasos para la próxima letra

            if (typeof callback === 'function') {
                setTimeout(callback, 500); // Ajusta el intervalo de tiempo entre letras
            }
        }
    }

    moveStep(); // Inicia el movimiento suave
}





function move_tape(index, results = 0) {
    let steps = 10 ; // Número de pasos para el movimiento suave
    let stepCount = 0;
    
    function moveStep() {
        if (stepCount < steps) {
            if (results !== 0) {
                switch (results[0].toNode.data.id) {
                    case 0:
                        text = text.replaceAt(index, "a"); 
                        position += -5.5;
                        position2 += -5.5;
                        tape(text, position);
                        tape2(tex22, position2);
                        break;
                    case 1:
                        text = text.replaceAt(index, "a")
                        position += -5.5;
                        position2 += -5.5;
                        tape(text, position);
                        tape2(tex22, position2);
                        break;
                    case 2:
                        index += text.length + 1;
                        position += 5.5;
                        position2 += 5.5;
                        tape(text, position);
                        tape2(tex22, position2);
                        break;
                    default:
                        position += 5.5;
                        position2 += 5.5;
                        tape(text, position);
                        tape2(tex22, position2);
                        break;
                }
            } else {
                position += -5.5;
                position2 += -5.5;
                tape(text, position);
                tape2(tex22, position2);
            }

            stepCount++;
            window.requestAnimationFrame(moveStep);
        }
    }

    moveStep(); // Inicia el movimiento suave
}


function paint_tour(arista){
    unpaint_node(arista.fromNode);
    paint_node(arista.toNode);
    paint_link(arista, tiempo);
}

function pintarRecorrido2(arista){
    paint_link(arista, tiempo);
}

function paint_link(arista, tiempo) {
    window.setTimeout(function(){ 
        arista.path.stroke = "red";
        var shape = arista.findObject("arrow");
        shape.fill = "red";
    },0);
    window.setTimeout(function(){ 
        arista.path.stroke = "black";
        var shape = arista.findObject("arrow");
        shape.fill = "#black";
    }, tiempo/2);
}

function paint_node(nodo) {
    var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
    shape.fill = "#7672F2"; //Cambiar el color a un nodo   
}

function unpaint_node(nodo) {
    var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
    shape.fill = "white"; //Cambiar el color a un nodo  
}

function unpaint(diagrama, limpiarTodo = false){
    if(limpiarTodo){
        unpaint_node(diagrama.findNodeForKey(0));
        unpaint_node(diagrama.findNodeForKey(1));
        unpaint_node(diagrama.findNodeForKey(2));
    }else{
        unpaint_node(diagrama.findNodeForKey(2));
    }
}


function transformValorInput(velocity) {
    if (velocity == 5) {
      return 250;
    } else if (velocity == 4) {
      return 625;
    } else if (velocity == 3) {
      return 1000;
    } else if (velocity == 2) {
      return 1500;
    } else {
      return 2000;
    }
  }

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}


