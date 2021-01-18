class Nodo{
    constructor(valor=null){
      this.valor=valor;
      this.izq=null;
      this.der=null;
    }
}
class ArbolExpresiones{
    constructor(){
      this.root=null;
}
nodoEstaLleno(nodo){
     return nodo.valor && nodo.izq && nodo.der;
}
esNumero(n){
    return !this.esOperador(n);
}
esOperador(operador){
    return operador==='+' || operador==='-' || operador==='*' || operador==='/' || operador==='^';
}
crearNodo(nodo, valor){
    if(this.esNumero(valor)){
        if(!nodo.izq){
            nodo.izq=new Nodo(parseInt(valor));
        }else{
            nodo.der=new Nodo(parseInt(valor));
        }
    }else if(this.esOperador(valor)){
        if(!nodo.valor){
            nodo.valor=valor;
        }
    }
}
esNodo(nodo){
    return typeof nodo==="object" && nodo.izq && nodo.der;
}
preOrden(node){
    if(!node){
        return;
    }else{
        document.getElementById('preorden').innerHTML+=node.valor+" ";
        this.preOrden(node.izq);
        this.preOrden(node.der);
    }
}
postOrden(node){
    if(!node){
        return;
    }else{
        this.postOrden(node.izq);
        this.postOrden(node.der);
        document.getElementById('postorden').innerHTML+=node.valor+" ";
    }
}
calcularOperacion(op, l, r){
    let resultado;
  
    switch(op){
        case '+':
          resultado=l+r;
        break; 
        case '-':
          resultado=l-r;
        break; 
        case '*':
          resultado=l*r;
        break; 
        case '/':
          resultado=l/r;
        break;
        case '^':
          resultado=Math.pow(l, r);
        break;
      }
    return resultado;
}
calcularArbol(nodo){
    nodo=nodo?nodo:this.root;
  
    let l, r, op;
    if(this.esNodo(nodo.izq)){
        l=this.calcularArbol(nodo.izq);
    }

    if(this.esNodo(nodo.der)){
        r=this.calcularArbol(nodo.der);
    }
      
    l=l?l:nodo.izq.valor;
    r=r?r:nodo.der.valor;
    op=op?op:nodo.valor;
  
    return this.calcularOperacion(op, l, r);   
}
  
expresion(expresion){
    this.root=new Nodo();
    let nodoActual=this.root;
      
    for (let i=0; i<expresion.length; i++){
        let valorActual=expresion[i];
  
        if (this.esOperador(valorActual) && this.nodoEstaLleno(nodoActual)){
            let nodoAux=new Nodo(valorActual);
            nodoAux.izq=nodoActual;
            nodoActual=nodoAux;
            continue;
            }
        this.crearNodo(nodoActual, valorActual);
        }
    this.root=nodoActual;
    }
}
  
const btnCalcular=document.getElementById('btnCalcular');
  
btnCalcular.addEventListener('click', function(){
    const inputExpresion=document.getElementById('expresion');
    const inputResultadoExpresion=document.getElementById('resultadoExpresion');
    document.getElementById('preorden').innerHTML = "";
    document.getElementById('postorden').innerHTML = "";
    
    const expresion=inputExpresion.value;
    if (expresion.length>0){
        const arbol=new ArbolExpresiones();
        arbol.expresion(expresion);
        arbol.postOrden(arbol.root);
        arbol.preOrden(arbol.root);
        console.log(arbol);
        inputResultadoExpresion.value=arbol.calcularArbol();
    }
});