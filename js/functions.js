$(function(){

	var valorAtual = 0;
	var isDrag = false; //variavel para detectar se o mouse esta sendo arrastado
	var precoMaximo = 70000;
	var precoAtual = 0;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	})

	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelect();
	})

	$('.barra-preco').mousemove(function(e){
		if(isDrag){
			disableTextSelect();
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;
			if (mouseX < 0)
				mouseX = 0;
			if(mouseX >= elBase.width())
				mouseX = elBase.width();

			$('.pointer-barra').css('left',(mouseX-13)+'px');
			valorAtual = (mouseX / elBase.width()) * 100;
			$('.barra-preco-fill').css('width',valorAtual+'%');

			precoAtual = (valorAtual/100) * precoMaximo;
			precoAtual = formatarPreco(precoAtual);
			$('.preco_pesquisa').html('R$'+precoAtual);
		}
	})

	function formatarPreco(precoAtual){
		precoAtual = precoAtual.toFixed(2);
		preco_arr = precoAtual.split('.');

		var novoPreco = formatarTotal(preco_arr);
		return novoPreco;
	}

	function formatarTotal(preco_arr){
		if(preco_arr[0] < 1000){
			return preco_arr[0]+','+preco_arr[1];
		}else if(preco_arr[0] < 10000){
			return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+
			','+preco_arr[1];
		}else{
			return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+
			','+preco_arr[1];
		}
	}

	function disableTextSelect(){
		$("body").css("-webkit-user-select","auto");
		$("body").css("-moz-user-select","auto");
		$("body").css("-ms-user-select","auto");
		$("body").css("-o-user-select","auto");
		$("body").css("user-select","auto");
	}

	function enableTextSelect(){
		$("body").css("-webkit-user-select","none");
		$("body").css("-moz-user-select","none");
		$("body").css("-ms-user-select","none");
		$("body").css("-o-user-select","none");
		$("body").css("user-select","none");
	}

	/*********** SLIDER ****************/

	var imgShow = 3;//define a quantidade de imagens que vão aparecer
	/*Math.ceil calcula o total elementos e divide por tres com base no posição atual
	(curIndex), porem ele retorna o valor 1 cravado, não pode avançar para um então subtrai 1 para
	pegar o valor real */
	var maxIndex = Math.ceil($('.mini-img-wraper').length/3) - 1;
	var curIndex = 0;//posição atual

	initSlider();
	navigateSlider();
	clickMarca();
	function initSlider(){
		var amt = $('.mini-img-wraper').length * 33.3;//Lê o total de imagens na classe e multiplica

		var elScroll = $('.nav-galeria-wraper');//define o scroll da classe

		var elSingle = $('.mini-img-wraper');//define o tamanho individual de cada imagem

		elScroll.css('width',amt+'%');//define a largura em % com base no calculo do total de imagens

		elSingle.css('width',33.3*(100/amt)+'%');/* define o tamanho das imagens em %, de acordo com 
		tamanho total da classe(elScroll) divido pelo valor total da imagens(amt)*/
	}

	function navigateSlider(){//função de navegação do slider
		$('.arrow-right-nav').click(function(){
			if(curIndex < maxIndex){
				curIndex++;//Incrementa mais 1 no valor atual(curIndex)

				/*Variavel para pegar(offset) os elementos a esquerda(curIndex*3 = 3 quantidade de elementos a 
				serem localizados) da classe(mini-img-wraper), subtraindo pelo tamanho da classe total com scroll
				(nav-galeria-wraper)*/
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;

				/*Animação de scroll mostrando os elementos definidos na variavel elOff*/
				$('.nav-galeria').animate({'scrollLeft':elOff});
			}else{
				console.log("Chegamos ao final!")
			}
		});

		$('.arrow-left-nav').click(function(){
			if(curIndex > 0){
				curIndex--;//Decrementa 1 no valor atual(curIndex)

				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;

				/*Animação de scroll mostrando os elementos definidos na variavel elOff*/
				$('.nav-galeria').animate({'scrollLeft':elOff});
			}else{
				console.log("Chegamos ao final!")
			}
		});
	}

	function clickMarca(){
		$('.mini-img-wraper').click(function(){
			$('.mini-img-wraper').css('background-color','transparent');
			$(this).css('background-color','rgb(210,210,210)');
			var img = $(this).children().css('background-image');
			$('.foto-destaque').css('background-image',img);
		})

		$('.mini-img-wraper').eq(0).click();
	}

	$('[goto=contato]').click(function(){

		$('html,body').animate({'scrollTop':$('#contato').offset().top});

		return false
	})

	/*
		menu responsivo
	*/

	$('.mobile').click(function(){
		$(this).find('ul').slideToggle();
	});

	/*
		sistema de navegação dos depoimentos
	*/

	var amtDepoimento = $('.depoimento-single p').length;
        var curIndex = 0;

        iniciarDepoimentos();
        navegarDepoimentos();

        function iniciarDepoimentos(){
            $('.depoimento-single p').hide();
            $('.depoimento-single p').eq(0).show();
        }

        function navegarDepoimentos(){
            $('[next]').click(function(){
                 curIndex++;
                 if(curIndex >= amtDepoimento)
                    curIndex = 0;
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(curIndex).show();
                
            })

            $('[prev]').click(function(){
                curIndex--;
                 if(curIndex < 0)
                    curIndex = amtDepoimento-1;
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(curIndex).show();
            })
        }
});