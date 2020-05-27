window.onload = function() { //tras cargar la página ... 
   //Localización de elementos en el DOM:
   oculta4=ocultar(4);    // oculta submenus 1 al 4
   oculta2=ocultar(2);
   oculta1=ocultar(1);
   oculta3=ocultar(3);

   images = [
      'i1.jpg', 
      'i2.jpg', 
      'i3.jpg',
      'i4.jpg',
      'i5.jpg',
      'i6.jpg',
      'i7.jpg',
      'i8.jpg',
      'i9.jpg',
      'i10.jpg',
      'i11.jpg'
   ];
   num1 = 0;
   num2 = 1;

   imgEnt=document.images["fotoEntrante"]; //imagen entrante
   imgSal=document.images["fotoSaliente"];  //imagen saliente
   divEnt=document.getElementById("entrante"); //pantalla móvil entrante
   divSal=document.getElementById("saliente"); //pantalla movil saliente
   tie=document.getElementById("TablaimagenE"); //celda de imagen entrante
   tis=document.getElementById("TablaimagenS"); //celda de imagen saliente
   pararCambio=setInterval(cambio,5000); //iniciar visionado automático
   numImagen=0; //Referencia a la imagen.
   modo="3"; //referencia al modo de transición.
   }
   
   function cambio() { //Temporizador de cambio de imagen
            //reiniciar variables
            divSal.style.left="0px"; //posición pantalla saliente
            divSal.style.top="0px";
            divEnt.style.left="0px"; //posición pantalla entrante
            divEnt.style.top="0px";
            divSal.style.opacity=1; //opacidad imagen saliente
            divSal.style.filter="alpha(opacity=100)";
            imgEnt.style.width="512px"; //tamaño imagen entrante
            imgSal.style.width="512px"; //tamaño imagen saliente
            divSal.style.zIndex="0"; //restaurar superposiciones
            //tipos de transición
            switch (modo) {
            case "0": //tipo Sin transición
               divSal.style.left="512px"; //posición inicial pantalla saliente.
               break;
            case "1": //tipo De derecha a izquierda
               posEnt=512; //posición inicial pantalla entrante.
               posSal=0; //posicion inicial pantalla saliente.
               break;
            case "2": //tipo De izquierda a derecha
               posEnt=-512; //posición inicial pantalla entrante.
               posSal=0; //posicion inicial pantalla saliente.
               break;
            case "3": //tipo De arriba a abajo
               posEnt=-512; 
               posSal=0; 
               break;
            case "4": //tipo De abajo a arriba
               posEnt=512; 
               posSal=0; 
               break;
            case "5": //tipo Transparencias
               gradoTrans=100;
               break;
            case "6": //tipo Aumentar imagen 
               aumentar=0; //tamaño inicial
               tie.valign="middle" //alineación vertical centrada
               tie.align="center" //alineación horizontal centrada
               tie.height="512" //altura = altura de imagen
               tie.width="512" //anchura = anchura de imagen
               break;
            case "7": //tipo Disminuir imagen 
               disminuir=512; //tamaño inicial 
               tis.valign="middle" //alineación vertical centrada 
               tis.align="center" //alineación horizontal centrada 
               tis.height="512" //altura = altura de imagen 
               tis.width="512" //anchura = anchura de imagen 
               break;
            }
           
            //Transición y paso a imagen siguiente.
            completado=setInterval(transicion,50); //iniciar temporizador transición
            numImagen++; //paso a la imagen siguiente
            if (numImagen>6) { //reiniciar tras llegar al final.
               numImagen=1;
               }
            }
            
   function transicion() { //temporizador de transición
            switch (modo) { 
            case "0": //modo sin transición
               visionar() ; //visualizar elementos comunes
               clearInterval(completado) //parar transición
               break;
            case "1": //modo de derecha a izquierda
               visionar(); //visualizar en pantalla
               posEnt-=10; //px de desplazamiento para entrante
               posSal-=10; //px de desplazamiento para saliente
               divEnt.style.left=posEnt+"px"; //desplazamiento pantalla entrante 
               divSal.style.left=posSal+"px";	//desplazamiento pantalla saliente 
               if (posEnt<=0){ //la pantalla entrante ocupa todo el visor:
                clearInterval(completado) //parar el desplazamiento.   
                }
               break;
            case "2":  //modo de izquierda a derecha
               visionar(); //visualizar en pantalla
               posEnt+=10; //px de desplazamiento
               posSal+=10; 
               divEnt.style.left=posEnt+"px"; //desplazamiento pantallas
               divSal.style.left=posSal+"px";	
               if (posEnt>=0){ 
                clearInterval(completado) //parar el desplazamiento.   
                }
               break;
            case "3":  //modo de arriba a abajo
               visionar(); //visualizar en pantalla
               posEnt+=10; //px de desplazamiento
               posSal+=10; 
               divEnt.style.top=posEnt+"px"; //desplazamiento pantallas 
               divSal.style.top=posSal+"px";	
               if (posEnt>=0){ //parar el desplazamiento.
                   clearInterval(completado)    
                   }
               break;
            case "4":  //modo de abajo a arriba
               visionar(); //visualizar en pantalla
               posEnt-=10; //px de desplazamiento
               posSal-=10; 
               divEnt.style.top=posEnt+"px"; //desplazamiento pantallas 
               divSal.style.top=posSal+"px";	
               if (posEnt<=0){ //parar el desplazamiento.
                   clearInterval(completado)    
                   }
               break;
            case "5": //modo transparencias
               gradoTrans-=2; //cambio en el grado de transparencia
               transpEnt=(100-gradoTrans)/100; //grado transp. para entrante (mozilla)
               transpSal=gradoTrans/100; //grado trans. para saliente (mozilla)
               transpIeEnt=100-gradoTrans; //grado trans. para entrante (I.E.)
               transpIeSal=gradoTrans; //grado trans. para saliente (I.E.)
               divEnt.style.opacity=transpEnt; //estilo trans. entrante (mozilla)
               divSal.style.opacity=transpSal; //estilo trans. saliente (mozilla)
               divEnt.style.filter="alpha(opacity="+transpIeEnt+")"; //estilo trans. entrante (I.E.)
               divSal.style.filter="alpha(opacity="+transpIeSal+")"; //estilo trans. saliente (I.E.)
               visionar() //visualizar pantallas de imagen
               if (gradoTrans<=0 ) { // completamos la transición
                  clearInterval(completado) //paramos el temporizador.
                  }
               break;
            case "6": //modo aumentar imagen
               aumentar+=10; //aumento de tamaño por intervalo
               imgEnt.style.width=aumentar+"px" //aplicar aumento con CSS
               visionar() //ver imágenes
               if (aumentar>=512){ //parar transición al completar.
                  clearInterval(completado);
                  }
               break;
            case "7": //modo disminuir imagen
               disminuir-=10; //disminución de tamaño por intervalo
               imgSal.style.width=disminuir+"px" //aplicar disminución con CSS
               divSal.style.zIndex="1" //posicionar delante
               visionar() //ver imágenes
               if (disminuir<=0){ //parar transición al completar.
                  clearInterval(completado);	
                  }
               break;
            }
            }
            
   function visionar() { //visualiza la imagen
            fotoEntra=numImagen+1; //num para foto entrante
            if (fotoEntra>6) { //reiniciamos ciclo al llegar al final
               fotoEntra=1;
               }
            imgEnt.src="foto"+fotoEntra+".jpg"; //mostrar imagen entrante
            imgSal.src="foto"+numImagen+".jpg"; //mostrar imagen saliente
            }
   
   // funciones para menus --------------------------------------------------
   
   function ver(n) {
               document.getElementById("subseccion"+n).style.display="block"
               }
   function ocultar(n) {
               document.getElementById("subseccion"+n).style.display="none"
               }
                
   function next() {
                  var slider1 = document.getElementById('Islider1');
                  var slider2 = document.getElementById('Islider2');
                  num1++;
                  num2++;
                  if(num2 >= images.length) {
                      num2 = 1;
                      num1 = 0;
                  }
                  slider1.src = images[num1];
                  slider2.src = images[num2];
                }
   function prev() {
                  var slider1= document.getElementById('Islider1');
                  var slider2= document.getElementById('Islider2');
                  num1--;
                  num2--;
                  if(num1 < 0) {
                      num1 = images.length - 2;
                      num2 = images.length - 1;
                  }
                  slider1.src = images[num1];
                  slider2.src = images[num2];
                  
                  }