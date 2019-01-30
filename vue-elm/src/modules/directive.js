
import Vue from 'vue'
import { remToPX} from './mUtil'

let handlers = {
	'scroll-show': function (el, binding, context){
		//el是被绑定指令的元素，可以用来操作dom
		var distance =binding.arg;
		if( document.documentElement.scrollTop >= distance){
			//context是vnode的属性，表示当前使用指令的组件，可以使用组件的data
			//binding是指令的属性，binding.expression是指令的表达式
			if(!context[binding.expression]){
				context[binding.expression] = true;
			}
		}else{
				if( context[binding.expression]){
					context[binding.expression] = false;
				}
			}
		
	},
	'fixed': function (el, binding, {context}) {
		if(getComputedStyle(el, null)['position'] === 'static'){
			var distance = el.offsetTop - binding.value.distance * 100;
			//要绑定给固定元素的父元素，如果绑定的是固定元素，el的offsetTop值固定后变化，没有办法回到原来位置
			if(document.documentElement.scrollTop >= distance){
				//防止重复赋值，消耗性能,在组件中添加一个dataisfixed控制
				if(!context.isfixed){
					context.isfixed= true;
					el.children[0].style.position = 'fixed';
					el.children[0].style.top = binding.value.distance ? binding.value.distance + 'rem' : 0;
				}
			}else if(document.documentElement.scrollTop< distance){
				if (context.isfixed) {
					el.children[0].style.position = '';
					el.children[0].style.top=0;
					context.isfixed = false;
				}
			}
		}
	},
	'backtop':function(){
		document.documentElement.scrollTop=0;
	}
}

Vue.directive('scroll-show', {
	//bind只有在指令第一个绑定到元素的时候执行，只调用一次
	bind: function(el, binding, {context}){
		window.addEventListener('scroll', handlers[binding.name].bind(this, el, binding, context));
	},
	//指令解绑时调用，组件被销毁时
	unbind: function(el, binding){
		window.removeEventListener('scroll', handlers[binding.name]);
	}
})

Vue.directive('fixed', {
	bind: function(el, binding, {context}){
		window.addEventListener('scroll', handlers[binding.name].bind(this, el, binding, {context}))
	},
	unbind: function(el, binding ){
		window.removeEventListener('scroll', handlers[binding.name])
	}
})

Vue.directive('backtop', {
	inserted: function(el, binding){
		el.addEventListener('click', handlers[binding.name])
	}
})

