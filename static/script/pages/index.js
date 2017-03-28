$.get('/ajax/index',function(d){
	console.log(d);
   var windowWidth = $(window).width();
   if(windowWidth<320){
   	  windowWidth = 320;
   }

   new Vue({
   	  el:'#app',
   	  data: function() {
   	  	return{
            screen_width:windowWidth,
            double_screen_width:windowWidth*2,
            top:d.items[0].data.data,
            hot:d.items[1].data.data,
            recommend:d.items[2].data.data,
            female:d.items[3].data.data,
            male:d.items[4].data.data,
            free:d.items[5].data.data,
            topic:d.items[6].data.data,
            duration:0,
            position:0,
            header_position:0,
            header_duration:0,
            tab_1_class:'Swipe-tab__on',
            tab_2_class:''
		}

   	  },
   	  methods:{
   	  }
   })
},'json');