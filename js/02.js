"use strict";

/*En este archivo no se incluyen las
siguientes funciones*/
//- addAt()
//- lastIndexOf()
//- set()

//Tamaño máximo de la lista
const MAX_ELEMENTS_LIST = 5;
//Tamaño mínimo de la lista
const MIN_ELEMENTS_LIST = 0;

//Función que crea la lista
function createList(){
    return [];
}

/*Función que devuelve true si la lista está
vacía y false si no lo está*/
function isEmpty(list){
    return list.length === 0 ? true : false;
}

/*Función que devuelve true si la lista
está llena y false si no lo está*/
function isFull(list){
    return list.length === MAX_ELEMENTS_LIST ? true : false;
}

/*Función que devuelve el número de
elementos que tiene la lista*/
function listSize(list){
    return list.length;
}

/*Función que añade un nuevo elemento a la lista
pero manterniendo la relación de órden. Devuelve
el tamaño de la lista una vez añadido*/
function add(list,elem){
    //Expresión regular que válida si un ISBN es válido
    let regExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }
    if(!isFull(list)){
        //Si el ISBN es válido metemos el libro
        if(regExp.test(elem.ISBN)){
            list.push(elem);
        }else{
            //Si no lanzamos una excepción
            throw "Error. ISBN no válido";
        }
    }else{
        throw "Error. La lista está llena";
    }

    //Ordenando la lista
    list.sort((a, b) => a.ISBN.localeCompare(b.ISBN));
    
    return listSize(list);
}

/*Función que devuelve el elemento de la
lista de la posición indicada*/
function get(list,key){
    if(key < MIN_ELEMENTS_LIST || key > MAX_ELEMENTS_LIST){
        throw "Error. Limites de lista superados";
    }else{
        //Cojo la propiedad title para saber que libro hemos seleccionado
        return list[key].title;
    }
}

//Función que devuelve la lista en forma de cadena
function toString(list){
    return list.reduce(function(string,elem,key){
        //Cojo la propiedad title para que la lista de libros sea más sencilla
        return (key !== 0) ? string + " - " + elem.title : string + elem.title;
    },"");
}

/*Función que devuelve la posción del elemento
indicado. Si el elemento no está en la lista
devuelve -1*/
function indexOf(list,elem){
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }else{
        let pos = list.indexOf(elem);
        return pos;
    }
}

/*Función que devuelve el máximo de elementos
que puede almacenar la lista*/
function capacity(){
    return MAX_ELEMENTS_LIST;
}

//Función que limpia la lista
function clearList(list){
    list.length = 0;
}

/*Función que devuelve el primer 
elemento de la lista*/
function firstElement(list){
    if(isEmpty(list)){
        throw "Error. La lista está vacia";
    }else{
        //Cojo la propiedad title para saber el nombre del primer libro
        return list[0].title;
    }
}

/*Función que devuelve el último
elemento de la lista*/
function lastElement(list){
    if(isEmpty(list)){
        throw "Error. La lista está vacia";
    }else{
        //Cojo la propiedad title para saber el nombre del último libro
        return list[list.length - 1].title;
    }
}

/*Función que elimina el elemento de la posición
indicada. Devuelve el elemento eliminado*/
function remove(list,key){
    if(key < MIN_ELEMENTS_LIST || key > MAX_ELEMENTS_LIST){
        throw "Error. Limites de lista superados";
    }else{
        let removed = list.splice(key,1);
        return removed;
    }
}

/*Función que elimina el elemento indicado de
la lista. Devuelve true si se ha podido eliminar
y false si no es así*/
function removeElement(list,elem){
    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }else{
        let removed = false;

        list.forEach(function (element, key){
            if(element.ISBN === elem.ISBN){
                list.splice(key, 1);
                removed = true;
            }
        });

        return removed;
    }
}

//Función para ir testeando las otras funciones
function test(){
    //Creamos la lista (probando el método createList)
    let list = createList();

    //Probando el método isEmpty()
    console.warn("PROBANDO EL MÉTODO ISEMPTY()");

    console.log(isEmpty(list)); //True

    //Probando el método isFull()
    console.warn("PROBANDO EL MÉTODO ISFULL()");

    console.log(isFull(list));  //False

    //Probando el método listSize()
    console.warn("PROBANDO EL MÉTODO LISTSIZE()");

    console.log(listSize(list));    //0

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

    //Esta vez añadiré 3 o más libros para comprobar si los ordena bien
    try{
        console.log("Nuevo elemento añadido. Tamaño de la lista " + add(list,book1));   //Añade el book1
    }catch(error){
        console.log(error);
    }

    try{
        console.log("Nuevo elemento añadido. Tamaño de la lista " + add(list,book2));   //Añade el book2
    }catch(error){
        console.log(error);
    }

    try{
        console.log("Nuevo elemento añadido. Tamaño de la lista " + add(list,book3));   //Añade el book3
    }catch(error){
        console.log(error);
    }

    try{
        console.log("Nuevo elemento añadido. Tamaño de la lista " + add(list,book5));   //Añade el book5
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE ADD
    console.warn("PROBANDO ERRORES DE ADD");

    //El elemento no es un libro
    try{
        console.log("Nuevo elemento añadido. Tamaño de la lista " + add(list,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //ISBN no válido
    try{
        console.log("Nuevo elemento añadido. Tamaño de la lista " + add(list,book6));
    }catch(error){
        console.log(error); //Error. ISBN no válido
    }

    //Probando el método get()
    console.warn("PROBANDO EL MÉTDOO GET()")

    try{
        console.log("Elemento seleccionado " + get(list,0));    //Coge el titulo del book1
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE GET
    console.warn("PROBANDO ERRORES DE GET");

    //Limites de lista superados
    try{
        console.log("Elemento seleccionado " + get(list,6));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    try{
        console.log("Elemento seleccionado " + get(list,-1));
    }catch(error){
        console.log(error); //Error. Limites de lista superados
    }

    //Probando el método toString()
    console.warn("PROBANDO EL MÉTODO TOSTRING");

    console.log(toString(list));

    //Probando el método indexOf()
    console.warn("PROBANDO EL MÉTODO INDEXOF");

    try{
        console.log("La posición del elemento indicado es " + indexOf(list,book1)); //Posición 0
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE INDEXOF
    console.warn("PROBANDO ERRORES DE INDEXOF");

    //El elemento no es un libro
    try{
        console.log("La posición del elemento indicado es " + indexOf(list,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //Probando el método capacity()
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
}
test();