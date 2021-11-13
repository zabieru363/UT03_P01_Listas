"use strict";

//Tamaño máximo de elementos de la lista
const MAX_ELEMENTS_LIST = 5;
//Tamaño minimo de elementos de la lista
const MIN_ELEMENT_LIST = 0;

//Función para crear la lista (el array)
function createlist(){
    //Devuelve un array vacio
    return [];
}

/*Función que comprueba si la lista está vacia
o no. Devuelve true si está vacia y false si no lo esta*/
function isEmpty(list){
    //Si es = 0 devuelve true, en caso contrario false
    return list.length === MIN_ELEMENT_LIST ? true : false;
}

/*Función que comprueba si la lista está llena.
Devuelve true si está llena y false si no lo está*/
function isFull(list){
    //Si es = 5 devuelve true, en caso contrario false
    return list.length === MAX_ELEMENTS_LIST ? true : false;
}

//Función que devuelve el total de elementos de la lista
function listSize(list){
    return list.length;
}

/*Función que añade un nuevo elemento al final de la
lista. Devuelve el tamaño de la lista una vez añadido*/
function add(list,elem){
    //Expresión regular que válida si un ISBN es válido
    let regExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

    //Si el elemento no es un libro
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }
    //Si la NO lista está llena
    if(!isFull(list)){
        //Si el ISBN es válido añadimos el libro
        if(regExp.test(elem.ISBN)){
            list.push(elem);
        }else{
            //Si no lanzamos una excepción
            throw "Error. ISBN no válido";
        }
    }else{
        //Si no lanzamos una excepción diciendo que la lista está llena
        throw "Error. La lista está llena";
    }
    
    return listSize(list);
}

/*Función que añade un nuevo elemento en la posición
especificada en la lista. Devuelve el tamaño de 
la lista una vez añadido*/
function addAt(list,elem,key){
    //Expresión regular que válida si un ISBN es válido
    let regExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

    //Si el elemento no es un libro
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }

    //Si la posición excede los limites de la lista
    if(key < MIN_ELEMENT_LIST || key > MAX_ELEMENTS_LIST){
        throw "Limites de lista superados";
    }else{
        //Si la lista NO está llena
        if(!isFull(list)){
            //Si el ISBN es válido añadimos el libro
            if(regExp.test(elem.ISBN)){
                list[key] = elem;
            }else{
                //Si no lanzamos una excepción
                throw "Error. ISBN no válido";
            }
        }else{
            //Si no lanzamos una excepción diciendo que la lista está llena
            throw "Error. La lista está llena";
        }
    }

    return listSize(list);
}

/*Función que devuelve el elemento de la lista de
la posición indicada*/
function get(list,key){
    //Si la posición excede los limites de la lista
    if(key < MIN_ELEMENT_LIST || key > MAX_ELEMENTS_LIST){
        throw "Error. Limites de lista superados";
    }else{
        //Cojo la propiedad title para saber que libro hemos seleccionado
        return list[key].title;
    }
}

//Función que devuelve la lista en forma de cadena
function toString(list){
    //Reduce en una variable (str) la lista de libros
    return list.reduce(function(string,elem,key){
        //Cojo la propiedad title para que la lista de libros sea más sencilla
        return (key !== 0) ? string + " - " + elem.title : string + elem.title;
    },"");
}

/*Función que devuelve la posición del elemento indicado.
Si el elemento no está en la lista devuelve -1*/
function indexOf(list,elem){
    //Si el elemento no es un libro
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }else{
        //Si lo es decimos en que posición se encuentra
        let pos = list.indexOf(elem);
        return pos;
    }
}

/*Función que devuelve la posición del elemento indicado
pero comenzando por el final. Si el elemento no está en
la lista devuelve -1*/
function lastIndexOf(list,elem){
    //Si el elemento no es un libro
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }else{
        //Le doy la vuelta a la lista ya que hay que empezar por el final
        list.reverse();
        //Si lo es decimos en que posición se encuentra
        let pos = list.indexOf(elem);
        return pos;
    }
}

/*Función que devuelve el número máximo de elementos
que podemos almacenar en la lista*/
function capacity(){
    //Retorna la máxima capacidad que tiene la lista
    return MAX_ELEMENTS_LIST;
}

//Funcion que vacía la lista
function clearList(list){
    //Seteo el length de la lista a 0 para limpiarla
    list.length = 0;
}

//Función que devuelve el primer elemento de la lista
function firstElement(list){
    //Si la lista está vacia
    if(isEmpty(list)){
        throw "Error. La lista está vacia";
    }else{
        //Si no cogemos el primer elemento
        //Cojo la propiedad title para saber cuál es el primer libro
        return list[0].title;
    }
}

//Función que devuelve el último elemento de la lista
function lastElement(list){
    //Si la lista está vacia
    if(isEmpty(list)){
        throw "Error. La lista está vacia";
    }else{
        //Si no es así retornamos el último elemento
        //Cojo la propiedad title para saber cuál es el último libro
        return list[list.length - 1].title;
    }
}

/*Función que quita el elemento de la posición indicada.
Devuelve el elemento eliminado*/
function remove(list,key){
    //Si la posición excede los limites de la lista
    if(key < MIN_ELEMENT_LIST || key > MAX_ELEMENTS_LIST){
        throw "Limites de lista superados";
    }else{
        //Si no lo borramos y retornamos el elemento borrado
        let removed = list.splice(key,1);
        return removed;
    }
}

/*Función que elimina el elmento indicado de la lista.
Devuelve true si se ha podido borrar el elemento y
false en caso contrario*/
function removeElement(list,elem){
    //Si el elemento no es un libro
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }else{
        //Si lo es lo borramos y retornamos si se ha borrado o no
        let removed = false;

        list.forEach(function(element, key){
            if(element.ISBN === elem.ISBN){
                list.splice(key, 1);
                removed = true;
            }
        });

        return removed;
    }
}

/*Función que reemplaza el elemento de la lista indicado
por el indice. Devuelve el elemento que estaba antes en
esa posición de la lista*/
function set(list,elem,key){
    //Si el elemento no es un libro
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }

    //Si la posición excede los limites de la lista
    if(key < MIN_ELEMENT_LIST || key > MAX_ELEMENTS_LIST){
        throw "Error. Limites de lista superados";
    }else{
        /*Si lo es reemplazamos el elemento por el indice y
        retornamos el que estaba antes*/
        /*Cojo la propiedad title para saber cuál es el 
        elemento que estaba antes en esa posición*/
        let element = list[key].title;
        list.splice(key,1,elem);
        return element;
    }
}

//Función para testear las otras funciones
function test(){
    //Probando el método createList
    let list = createlist();

    //Probando el método isEmpty
    console.warn("PROBANDO EL MÉTODO ISEMPTY()");
    console.log(isEmpty(list));

    //Probando el método isFull
    console.warn("PROBANDO EL MÉTODO ISFULL()");
    console.log(isFull(list));

    //Probando el método listSize
    console.warn("PROBANDO EL MÉTODO LISTSIZE()");
    console.log(listSize(list));

    //Primer objeto literal de tipo libro
    let book1 = {
        ISBN: "987-84-9804-654-0",
        title: "El Quijote",
        author: "Miguel de Cervantes",
        publicationDate: new Date(1605,0,1),
        price:20
    };

    //Segundo objeto literal de tipo libro
    let book2 = {
        ISBN: "986-83-9803-653-1",
        title: "El Principito",
        publicationDate: new Date(1895,0,1),
        price:26
    };

    //Tercer objeto literal de tipo libro
    let book3 = {
        ISBN: "978-84-1734-700-0",
        title: "Juramentada",
        author: "Brandon Sanderson",
        publicationDate: new Date(2017,10,14),
        price: 33.15,
    };

    let book4 = {
        /*Objeto libro vacio para comprobar el
        funcionamiento de los errores*/
    };

    //Quinto objeto literal de tipo libro
    let book5 = {
        ISBN: "978-84-9056-793-7",
        title: "La Divina Comedia",
        author: "Dante Alighieri",
        publicationDate: new Date( 2016, 5, 30),
        price: 43.10,
    };

    //Libro para comprobar el funcionamiento de la expresión regular
    let book6 = {
        ISBN: "978-84-9056-793-7367346738374908348",
        title: "La Divina Comedia",
        author: "Dante Alighieri",
        publicationDate: new Date( 2016, 5, 30),
        price: 43.10,
    };

    //Probando el método add
    console.warn("PROBANDO EL MÉTODO ADD()");

    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + add(list,book1));  //Añade el book1
    }catch(error){
        console.log(error);
    }

    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + add(list,book2));  //Añade el book2
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE ADD
    console.warn("PROBANDO ERRORES DE ADD");

    //El elemento no es un libro
    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + add(list,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //ISBN no válido
    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + add(list,book6));
    }catch(error){
        console.log(error); //Error. ISBN no válido
    }
    
    //Probando el método addAt
    console.warn("PROBANDO EL MÉTODO ADDAT()");

    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + addAt(list,book3,2));  //Añade el book3 en la posición 2
    }catch(error){
        console.log(error);
    }

    //PROBADNO ERRORES DE ADDAT
    console.warn("PROBANDO ERRORES DE ADDAT");

    //Limites de lista superados
    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + addAt(list,book3,6));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + addAt(list,book3,-1));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    //El elemento no es un libro
    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + addAt(list,book4,3));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //ISBN no válido
    try{
        console.log("Nuevo elemento añadido. Total de elementos: " + addAt(list,book6,3));
    }catch(error){
        console.log(error); //Error. ISBN no válido
    }

    //Probando el método get
    console.warn("PROBANDO EL MÉTODO GET()");

    try{
        console.log("Elemento seleccionado: " + get(list,0));   //Quijote
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE GET
    console.warn("PROBANDO ERRORES DE GET");

    //Limites de lista superados
    try{
        console.log("Elemento seleccionado: " + get(list,6));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    try{
        console.log("Elemento seleccionado: " + get(list,-1));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    //Probando el método toString
    console.warn("PROBANDO EL MÉTODO TOSTRING()");
    console.log(toString(list));

    //Probando el método indexOf
    console.warn("PROBANDO EL MÉTODO INDEXOF()");

    try{
        console.log("Elemento encontrado en la posición: " + indexOf(list,book1));  //Posición 0
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE INDEXOF
    console.warn("PROBANDO ERRORES DE INDEXOF");

    //El elemento no es un libro
    try{
        console.log("Elemento encontrado en la posición: " + indexOf(list,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //Elemento no encontrado en la lista (devuelve -1)
    try{
        console.log("Elemento encontrado en la posición: " + indexOf(list,book5));
    }catch(error){
        console.log(error); //-1
    }

    //Probando el método lastIndexOf
    console.warn("PROBANDO EL MÉTODO LASTINDEXOF()");

    try{
        console.log("Elemento encontrado en la posición: " + lastIndexOf(list,book1));  //Posición 2
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE LASTINDEXOF
    console.warn("PROBANDO ERRORES DE LASTINDEXOF");

    //El elemento no es un libro
    try{
        console.log("Elemento encontrado en la posición: " + lastIndexOf(list,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //Elemento no encontrado en la lista (devuelve -1)
    try{
        console.log("Elemento encontrado en la posición: " + lastIndexOf(list,book5));
    }catch(error){
        console.log(error); //-1
    }

    //Probando el método capacity
    console.warn("PROBANDO EL MÉTODO CAPACITY()");

    console.log("La capacidad máxima de la lista es de " + capacity() + " elementos");

    //Probando el método firstElement
    console.warn("PROBANDO EL MÉTODO FIRSTELEMENT()");

    try{
        console.log("El primer elemento de la lista es " + firstElement(list));
    }catch(error){
        console.log(error);
    }

    clearList(list);

    //PROBANDO ERRORES DE FIRSTELEMENT
    console.warn("PROBANDO ERRORES DE FIRSTELEMENT");

    //La lista está vacia
    try{
        console.log("El primer elemento de la lista es " + firstElement(list));
    }catch(error){
        console.log(error);
    }

    //Añado de nuevo los libros ya que he usado clearList anteriormente
    add(list,book1);
    add(list,book2);
    add(list,book3);
    add(list,book5);

    //Probando el método lastElement
    console.warn("PROBANDO EL MÉTODO LASTELEMENT()");

    try{
        console.log("El último elemento de la lista es " + lastElement(list));
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE LASTELEMENT
    console.warn("PROBANDO ERRORES DE LASTELEMENT");

    clearList(list);

    //La lista está vacia
    try{
        console.log("El último elemento de la lista es " + lastElement(list));
    }catch(error){
        console.log(error);
    }

    //Añado de nuevo los libros ya que he usado clearList anteriormente
    add(list,book1);
    add(list,book2);
    add(list,book3);
    add(list,book5);

    //Probando el método remove
    console.warn("PROBANDO EL MÉTODO REMOVE()");

    try{
        console.log("Elemento eliminado " + remove(list,0));
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE REMOVE
    console.warn("PROBANDO ERRORES DE REMOVE");

    //Limites de lista superados
    try{
        console.log("Elemento eliminado " + remove(list,6));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    try{
        console.log("Elemento eliminado " + remove(list,-1));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    //Probando el método removeElement
    console.warn("PROBANDO EL MÉTODO REMOVEELEMENT()");

    try{
        if(removeElement(list,book5)){
            console.log("Elemento eliminado correctamente");    //Eliminaria el book5
        }
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE REMOVEELEMENT
    console.warn("PROBANDO ERRORES DE REMOVEELEMENT");
    
    //El elemento no es un libro
    try{
        if(removeElement(list,book4)){
            console.log("Elemento eliminado correctamente");
        }
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //Probando el método set
    console.warn("PROBANDO EL MÉTODO SET()");

    try{
        console.log("Elemento reemplazado. Elemento anterior " + set(list,book2,1));    //Juramentada
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE SET
    console.warn("PROBANDO ERRORES DE SET");

    //El elemento no es un linro
    try{
        console.log("Elemento reemplazado. Elemento anterior " + set(list,book4,1));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //Limites de lista superados
    try{
        console.log("Elemento reemplazado. Elemento anterior " + set(list,book2,6));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }
}
test();