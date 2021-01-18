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
          nodo.izq=parseInt(valor);
        }else{
          nodo.der=parseInt(valor);
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
  
    if(this.esNodo(nodo.der)) {
        r=this.calcularArbol(nodo.der);
    }
      
    l=l?l:nodo.izq;
    r=r?r:nodo.der;
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
            nodoActual=nodoAux
            continue;
            }
        this.crearNodo(nodoActual, valorActual);
        }
    this.root = nodoActual;
    }
}
  
const btnCalcula=document.getElementById('btnCalcular');
  
btnCalcular.addEventListener('click', function(){
    const inputExpresion=document.getElementById('expresion');
    const inputResultadoExpresion=document.getElementById('resultadoExpresion');
    
    const expresion=inputExpresion.value;
    if (expresion.length>0){
        const arbol=new ArbolExpresiones();
        arbol.expresion(expresion);
        console.log(arbol);
        inputResultadoExpresion.value=arbol.calcularArbol();
    }
});