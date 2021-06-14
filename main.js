var states = 2;
var nSimb = 2;
var subs = ["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉","₁₀"];
var aviso = document.getElementById("aviso");

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------Programación interfaz gráfica---------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
function add(){
    if(states < 11) var index = subs[states];
    else var index = "ₙ";
    var tabla = document.getElementById("Table");
    var row = tabla.insertRow(states+1);
    var cell = row.insertCell(0);
    cell.className = "td2";
    cell.innerHTML = `<input id="c0" onClick="" type="text" value="" tabindex="1" maxlength="4" placeholder="q${index}"/>`;
    console.log("nSimbAdd: "+nSimb);
    for (var i=1; i <= nSimb ; i++){
        cell = row.insertCell(i);
        cell.innerHTML = `<input id="c1" onClick="" type="text" value="" tabindex="1" maxlength="11" placeholder="δ"/>`;
    }
    states++;
    console.log(states);
}

function remove(){
    if (states > 2){
        var tabla = document.getElementById("Table");
        tabla.deleteRow(states);
        states--;
        console.log("states: "+states);
    }
}

function cambiarAlfabeto(e){
    nSimb = e.value;
    console.log("nSimb: "+nSimb);
    if (nSimb > 10){ nSimb = 10; e.value = 10;}
    else if (nSimb < 2) {nSimb = 2; e.value = 2;}
    var tabla = document.getElementById("Table");
    //Table Header----------------------------------------------------------------------------------------------------------//
    var newTable = `<tr><td class="button" id="addbutton" class="button" onclick="add()" style="border-radius: 0"> + </td>`;
    for(var g=0 ; g < nSimb ; g++){
        newTable+= `<td><input type="" name="" maxlength="1" placeholder="λ"></td>`;
    }
    newTable+=`</tr>`;
    //First row
    newTable+=`<tr><td class="td2"><input type="text" value="" tabindex="1" maxlength="4" placeholder=">q₀"/></td>${'<td><input type="text" value="" tabindex="1" maxlength="11" placeholder="δ"/></td>'.repeat(nSimb)}`;
    /*for(var h=0 ; h < nSimb ; h++){
        newTable+= `<td><input type="text" value="" tabindex="1" maxlength="11" placeholder="δ"/></td>`;
    }*/
    newTable+=`</tr>`;
    //Table Body------------------------------------------------------------------------------------------------------------//
    for (var i=0; i < states-1 ; i++) {   
        newTable+=`<tr><td class="td2"><input type="text" value="" tabindex="1" maxlength="4" placeholder="q${((i < 10)? subs[i+1] : "ₙ")}"/></td>${'<td><input type="text" value="" tabindex="1" maxlength="11" placeholder="δ"/></td>'.repeat(nSimb)}</tr>`;
        /*for (var j = 0; j < nSimb ; j++) {
            newTable+=`<td><input type="text" value="" tabindex="1" maxlength="11" placeholder="δ"/></td>`;
        }*/
    }
    //Table Footer----------------------------------------------------------------------------------------------------------//
    newTable+=`<tr><td class="button" id="removebutton" class="button" onclick="remove()" style="border-radius: 0"> - </td>${'<td></td>'.repeat(nSimb)}</tr>`;
    /*for (var k = 0; k < nSimb ; k++) {
        newTable+= `<td></td>`;
    }*/
    tabla.innerHTML = newTable;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------


function tableToArray(){
    var tabla = document.getElementById("Table").children[0];
    tablaArray = [];
    filas = tabla.rows;
    for (var i = 1; i < filas.length-1 ; i++){
        var filaArray = [];
        celdas = filas[i].cells;;
        for (var j = 0; j < celdas.length ; j++){
            filaArray.push(celdas[j].childNodes[0].value);
        }
        tablaArray.push(filaArray);
    }
    console.log(tablaArray);
    return tablaArray;
}


function afndToAfd(){
    //Se obtienen los valores de la tabla en forma de arreglo
    var afnd = tableToArray();
    //Se obtienen los estados del AFND en un arreglo
    var estados = [];
    for (var i = 0; i < states; i++){
        estado = afnd[i][0];
        if (estado == ""){aviso.innerHTML = "Todos los estados deben tener nombre"; return;}
        if (estados.indexOf(estado) != -1){aviso.innerHTML = "Todos los estados deben tener diferente nombre"; return;}
        estados.push(estado);
    }
    console.log("Estados: ",estados);
    //Se obtienen las transiciones del AFND en un arreglo bidimensional 
    var transiciones = [];
    for (var j = 0; j < states; j++){
        transiciones_i = [];
        for  (var k = 1; k <= nSimb; k++){
            transicion = uniq(afnd[j][k].split(","));
            for(var m = 0; m < transicion.length; m++)
                if(estados.indexOf(transicion[m]) == -1 && transicion != ""){aviso.innerHTML = `El estado "${transicion[m]}" no está definido`; return;}
            transiciones_i.push(transicion.join(","));
        }
        transiciones.push(transiciones_i);
    }
    console.log("Transiciones: ", transiciones);
    
    aviso.innerHTML= "Aceptado";





    //Se realiza la conversión del autómata-------------------
    //estados:      ["p","q",...]

    /*transiciones: [ ["p","p,q",...] , 
                      ["q","",...] , ...
                    ]
    */
    var i = 0;
    while(i < transiciones.length){

        transiciones_i = transiciones[i];
        console.log("estadoActual:",estados[i]);
        transiciones_i.forEach(function(transicion, j) {
            console.log("trans: ",transicion);
            var nuevoEstado = transicion.split(",").join("");
            if(estados.indexOf(nuevoEstado) == -1 && nuevoEstado != ""){  //Si la transición apunta a un estado no existente, se crea ese estado
                console.log("nuevoest: ", nuevoEstado);
                estados.push(nuevoEstado);
                console.log("estados:",estados);
                var  nuevoEstadoTrans = [];
                for(var k = 0; k < nSimb ; k++){
                    var nuevaTransicion = [];
                    transicion.split(",").forEach(function (estado, m){
                        if(estado != "")
                            nuevaTransicion.push(transiciones[estados.indexOf(estado)][k]);  
                    });
                    console.log("nueva",nuevaTransicion);
                    nuevaTransicion = uniq(nuevaTransicion.join(",").split(","));
                    console.log("nuevaTrans:",nuevaTransicion.join(""));
                    nuevoEstadoTrans.push(nuevaTransicion.join(","));
                }
                console.log("nuevoEstadoTrans: ",nuevoEstadoTrans);
                transiciones.push(nuevoEstadoTrans);
                console.log("Transiciones: ",transiciones);

            }
        });
        i++;

    }
    //Se eliminan las comas
    transiciones.forEach(function(transicion, x) {
        transicion.forEach(function(transicion, y) {
            transiciones[x][y] = transicion.split(",").join("");
        });
    });
    console.log("TransicionesFINAL: ",transiciones," ----------------");

    //Se genera la nueva tabla
    var aux;
    var div = document.getElementById("tablaAFD");
    var tablaAFD = `<table><tr><td></td>`;
    //Table header
    for(var u = 0; u < nSimb; u++){
        tablaAFD += `<td>λ</td>`;
    }
    tablaAFD += `</tr>`;
    //Table body
    var filasAFD;
    for(var v = 0; v < estados.length; v++){
        aux = 1;
        filaAFD = `<tr><td class="td2">${estados[v]}</td>`;
        for (var w = 0; w < nSimb ; w++){
            console.log("test:",transiciones[v][w] );
            indexEstadoValidado =  estados.indexOf(transiciones[v][w]);
            //Se incluyen solo los estados sin transiciones vacías
            if(transiciones[v][w] == "") {aux = -1;break;}
            //Tampoco estados con transiciones que apunten a estados con transiciones vacías
            transiciones[indexEstadoValidado].forEach(function(transicion,d){if (transicion == "") {aux = -1;}});
            filaAFD += `<td>${uniq(transiciones[v][w].split("")).join("")}</td>`;

        }
        filaAFD += `</tr>`;
        if (aux == 1)
            tablaAFD += filaAFD;
    }
    tablaAFD += `</table>`;

    //Se muestra la tabla
    div.innerHTML = tablaAFD;
}


function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

    
//window.addEventListener("load",start,false);