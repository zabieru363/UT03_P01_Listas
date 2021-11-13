"use strict";

/*Aquí no hacen falta las constantes de tamaño
máximo y tamaño mínimo ya que el conjunto
podrá tener un número ilimitado de elementos*/

//Funcion que crea un array para el conjunto
function create(){
    return [];
}

/*Función que comprubea si el conjunto está
vacio. Devuelve true si está vacío y false en
caso contrario*/
function isEmpty(set){
     return set.size === 0 ? true : false;
}

/*Función que devuelve el número de elementos
de la lista*/
function setSize(set){
    return set.size;
}

/*Función que añade un nuveo elemento al conjunto
Devuelve el tamaño del conjunto una vez añadido.
El elemento no puede estar incluido en el conjunto,
verificando que el ISBN no exista previamente*/
function add(set,elem){
    //Expresión regular que válida si un ISBN es válido
    let regExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }
    if(!set.has(elem)){
        //Si el ISBN es válido metemos el libro al conjunto
        if(regExp.test(elem.ISBN)){
            set.add(elem);
        }else{
            //Si no lanzamos una excepción
            throw "Error. ISBN no válido";
        }
    }else{
        throw "Error. El libro ya está en el conjunto";
    }

    return setSize(set);
}

/*Función que indica si el elemento está
incluido en el conjunto comparando con la
propiedad ISBN*/
function has(set,elem){
    return set.has(elem) ? true : false;
}

/*Función que devuelve el conjunto 
en forma de cadena*/
function toString(set){
    //Variable con la lista de libros en formato cadena
    let str = "";
    //Variable que guarda el tamaño de datos del conjunto
    let key = setSize(set);

    //Cómo es un set utilizo un for of para construir el str
    for(let books of set){
        (key !== 0) ? str += books.title : str += books.title + "-";
    }

    return str;
}

//Función que vacia el conjunto
function clear(set){
    set.clear();
}

/*Función que quita un elemento del conjunto
utilizando el ISBN. Devuelve true si se ha
eliminado del conjunto o false si no es así*/
function remove(set,elem){
    let removed = false;

    if(!elem.ISBN || !elem.title){
        throw "Error. El elemento no es un libro";
    }else{
        if(set.has(elem)){
            set.delete(elem);
            removed = true;
        }else{
            removed = false;
        }

        return removed;
    }
}

//Función para ir testeando las otras funciones
function test(){
    //Creamos el conjunto
    let set = new Set(create());

    //Probando el método isEmpty()
    console.warn("PROBANDO EL MÉTODO ISEMPTY()");

    console.log(isEmpty(set));

    //Probando el método setSize()
    console.warn("PROBANDO EL MÉTODO SETSIZE()");

    console.log("Tamaño del conjunto " + setSize(set) + " elementos");

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
        price: 33.15
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
        price: 43.10
    };

     //Libro para comprobar el funcionamiento de la expresión regular
     let book6 = {
        ISBN: "978-84-9056-793-7367346738374908348",
        title: "La Divina Comedia",
        author: "Dante Alighieri",
        publicationDate: new Date( 2016, 5, 30),
        price: 43.10,
    };

    //Probando el método add()
    console.warn("PROBANDO EL MÉTODO ADD");

    try{
        console.log("Nuevo elemento añadido. Tamaño del conjunto " + add(set,book1));    //Añade el book1
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE ADD
    console.warn("PROBANDO ERRORES DE ADD");

    //El elemento no es un libro
    try{
        console.log("Nuevo elemento añadido. Tamaño del conjunto " + add(set,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //El elemento ya fue añadido al conjunto
    try{
        console.log("Nuevo elemento añadido. Tamaño del conjunto " + add(set,book1));
    }catch(error){
        console.log(error); //Error. El elemento ya fue añadido al conjunto
    }

    //ISBN no válido
    try{
        console.log("Nuevo elemento añadido. Tamaño del conjunto " + add(set,book6));
    }catch(error){
        console.log(error); //Error. ISBN no válido
    }

    //Probando el método has()
    console.warn("PROBANDO EL MÉTODO HAS()");

    try{
        console.log(has(set,book1));    //True
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE HAS
    console.warn("PROBANDO ERRORES DE HAS");

    //El elemento no es un libro
    try{
        console.log(has(set,book1));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }

    //Probando el método toString()
    console.warn("PROBANDO EL MÉTODO TOSTRING()");

    console.log(toString(set));

    //Probando el método clear()
    console.warn("PROBANDO EL MÉTODO CLEAR");

    clear(set); //Vacia el conjunto

    console.log("Tamaño del conjunto " + setSize(set));

    //Añado de nuevo los elementos que tenia
    add(set,book1);

    //Probando el método remove
    console.warn("PROBANDO EL MÉTODO REMOVE");

    try{
        console.log(remove(set,book1)); //true
    }catch(error){
        console.log(error);
    }

    //PROBANDO ERRORES DE REMOVE
    console.warn("PROBANDO ERRORES DE REMOVE");

    //Si no elimina el elemento
    try{
        console.log(remove(set,book1)); //false
    }catch(error){
        console.log(error);
    }

    //El elemento no es un libro
    try{
        console.log(remove(set,book4));
    }catch(error){
        console.log(error); //Error. El elemento no es un libro
    }
}
test();