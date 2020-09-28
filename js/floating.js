var g_v_menus = [];

// left
// var g_v_menus.push(new BloomingMenu({
//   startAngle: -90,
//   endAngle: 0,
//   radius: 100,
//   itemsNum: 4,
//   itemAnimationDelay: 0.08
// }));

// center
g_v_menus.push(new BloomingMenu({
  type: 'center',
  typeClass: 'fm center-menu',
  startAngle: 0,
  endAngle: 315,
  radius: 60,
  itemsNum: 8,
  CSSClassPrefix: 'blooming-menu-center_',
  mainWidth: '35px',
  itemWidth: '35px',
  itemsName: ['r18', 'favorite_list', 'setting', 'history', 'box', 'calendar', 'recommand', 'user'],
  itemAnimationDelay: 0.08
}));

// //right
// g_v_menus.push(new BloomingMenu({
//   type: 'right',
//   typeClass: 'fm right-menu',
//   startAngle: -90,
//   endAngle: -180,
//   radius: 100,
//   itemsNum: 4,
//   fontSize: '32px',
//   CSSClassPrefix: 'blooming-menu-right_',
//   mainWidth: '40px',
//   itemWidth: '40px',
//   mainContent: '*',
//   itemAnimationDelay: 0.08
// }));

//up
g_v_menus.push(new BloomingMenu({
  type: 'up',
  typeClass: 'fm up-menu',
  startAngle: -90,
  endAngle: -180,
  radius: 100,
  itemsNum: 6,
  mainWidth: '40px',
  CSSClassPrefix: 'blooming-menu-up_',
  itemWidth: '40px',
  itemsName: ['paint', 'favorite', 'share', 'delete', 'do', 'info'],
  itemAnimationDelay: 0.08
}));

var i = 0;
for(var menu of g_v_menus){
	menu.render();
	$(menu.props.elements.container).addClass(menu.props.typeClass);
	switch(menu.props.type){
		case 'center':
			setMoveable(menu.props.elements.container);
			menu.props.elements.items.forEach(function (item, index) {
			item.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				var action = item.getAttribute('action_name')
			  	console.log(action);
			    switch(action){
			  		case 'r18':
			  			var bt = $(item).find('button');
			    		var r18 = !(bt.css('backgroundImage').indexOf("adult.svg") > 0);
			  			g_a_log.r18 = r18;
			    		bt.css('backgroundImage', 'url("./svg/'+ (r18 ? 'adult' : 'child') + '.svg")');
						break;

					case 'favorite_list':
						switchGridName('favorite');
						$('.tab_desc').remove();
						$('.countrySelection-item.active').removeClass('active');
						break;

					case 'history':
						switchGridName('log');
						$('.tab_desc').remove();
						$('.countrySelection-item.active').removeClass('active');
						break;
			  	}
			  })
			})       
			break;

		case 'right':
				menu.props.elements.items.forEach(function (item, index) {
				item.addEventListener('click', function (event) {
					event.preventDefault();
					event.stopPropagation();
				  	console.log(index);
				    switch(index){
				  		case 0:
							break;

						case 1:
							break;

						case 2:
							break;

						case 3:
							break;
				  	}
				  })
				})       
			break;

		case 'up':
			menu.props.elements.items.forEach(function (item, index) {
			item.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				var action = item.getAttribute('action_name')
			    switch(action){
			    	case 'info':
			    		_window_picInfo_switch();
			    		break;
			    	case 'share':
			    		// var json = g_v_gallery_info.gallery.json;
			    		// FileSaver.saveAs(json.preview_url, json.host+'_'+json.id+'.jpg');
			    		break;
			    	case 'favorite':
			    			item.setAttribute('id', 'viewer_favorite');
			    			modal_tag(g_v_gallery_info.gallery.json);
			    		break;
			    	case 'do':
			    		preSavePaint();
			    		break;
			  		case 'paint':
			  			if(g_v_paint.data == ''){
			  				var overTime;
			  				x0p({
							    title: getText('是否开始计时', 'Start'),
							    type: 'info',
							    inputType: 'text',
							    buttons: [
							    	{
							    		type: 'ok',
							    		text: 'ok',
							    		key: 13
							    	},{
							    		type: 'info',
							    		text: '15min'
							    	},{
							    		type: 'warning',
							    		text: '30min'
							    	},{
							    		type: 'cancel',
							    		text: 'cancel',
							    		key: 27
							    	}
							    ],
							    inputPlaceholder: getText('分钟数(不填正计时)', 'Minutes (not required)'),
							    inputColor: '#F29F3F',
							    inputValidator: function(button, value) {
							        if(value != '' && isNaN(value)){
							        	return getText('非法数字!', 'Illegal number');
							        }
							        value = parseInt(value);
							        if(value > 0){
							       		overTime = parseInt(value) * 60;
							        }else{
							        	overTime = -1;
							        }
							    }
							}, function(button, text) {
								closeMenu();
							    if(button == 'cancel') {
							    	return;
							    }

							    if(button == 'info'){
							       	overTime = 15 * 60;
							    }else
							    if(button == 'warning'){
							       	overTime = 30 * 60;
							    }
							    startPaint(overTime);

							});
			  			}else{
			  				_tip_time();
			  			}
						break;

						default:
							return;
			  	}
			});
			});      
			break;
	}
	i++;
}

function setFavorite(json, favorite = true){
	var k = json.host+'_'+json.id;
	if(favorite){
		g_v_favorite_list.post[k] = json;
	}else{
		delete g_v_favorite_list.post[k];
		$('.grid--type-favorite .grid__item[data-pid='+json.id+']').remove();
		$('.grid--type-favorite .grid__item').each(function(index, el) {
			$(el).attr('data-id-index', index);
		});
		setTimeout(function(){
			$('.grid--type-favorite').masonry('layout');
		}, 500);
	}
	setLocalData('favorite', JSON.stringify(g_v_favorite_list));
	$('.grid__item[data-host="'+json.host+'"][data-pid='+json.id+']').find('i').html('bookmark'+(favorite ? '' : '_border'));
	$('#viewer_favorite').css('backgroundImage', 'url("./svg/favorite'+ (favorite ? 'd' : '') + '.svg")');

}

function getFavorite(k){
	return g_v_favorite_list.post[k];
}

function imageDataExists(a_json, json){
	for(var i=0;i<a_json.length;i++){
		if(a_json[i].id == json.id && a_json[i].host == json.host){
			return i;
		}
	}
	return -1;
}

// 初始化所有数据的 host和id已经索引
function initLogList_id(){

}


// 浏览的图片切换事件
function _event_viewImage(json){
	var i = getFavorite(json.host+'_'+json.id);
	// 是否收藏
	$('.up-menu li[action_name="favorite"]').find('button').css('backgroundImage', 'url("./svg/favorite'+(i!=-1?'d':'')+'.svg")');


}

function isSame(j1, j2){
	if(typeof(j1) != 'object' || typeof(j2) != 'object') return false;
	return j1.host == j2.host && j1.id == j2.id;
}

function _tip_time(){
	if(!isSame(g_v_paint.data, getViewingJson())){
		x0p({
		    title: getText('提示', 'Tip'),
		    text: getText('上一张图片还没有被记录,请选择操作', 'last picture has not been recorded, please choose action'),
		    animationType: 'slideUp',
		    icon: 'custom',
		    iconURL: 'svg/info.svg',
		    buttons: [
		    	 {
		            type: 'ok',
		            text: getText('保存并开始', 'Save and start new'),
		        },
		        {
		            type: 'error',
		            text: getText('放弃并开始', 'Give up and start new'),
		        },
		         {
		            type: 'info',
		            text: getText('回到上一张', 'Back to previous'),
		        },
		        {
		            type: 'cancel',
		            text: getText('取消', 'Cancel'),
		            key: 27
		        }
		    ]
		}, function(button) {
			if(button == 'ok'){
				_tip_saveFinishWork(startPaint);
			}else
			if(button == 'error'){
				resetPaintTime(true);
				startPaint();
			}else
			if(button == 'info'){
				g_v_gallery_info.gallery.hide();
				setTimeout(function(){
						loadGallery(getGridDom(g_v_paint.data.host, g_v_paint.data.id).children(0));
				}, 1000);
			}
			closeMenu();
		});
		return;	
	}
	x0p({
		    title: getText('选择操作类型','What do you want'),
		    text: '',
		    animationType: 'slideUp',
		    icon: 'custom',
		    iconURL: 'svg/info.svg',
		    buttons: [
		    	 {
		            type: 'waring',
		            text: getText('重新计时', 'reset'),
		        },
		        {
		            type: 'error',
		            text: getText('放弃计时', 'give up'),
		        },
		         {
		            type: 'info',
		            text: g_v_paint.isStop ? getText('恢复计时', 'continue') : getText('暂停计时', 'Pause')
		        },
		        {
		            type: 'cancel',
		            text: getText('取消', 'cancel'),
		            key: 27
		        }
		    ]
		}, function(button) {
			if(button == 'waring'){
				_tip_resetTime();
			}else
			if(button == 'error'){
				_tip_giveUp();
			}else
			if(button == 'info'){
				switcPause();
			}
			closeMenu();
		});
}

function _tip_resetTime(){
	x0p('重新计时', '你将会丢失计时数据!', 'warning', function(button){
		if(button == 'warning'){
			resetPaintTime(false);
			x0p('Message', '重新计时!');
		}
	});
}

function _tip_giveUp(){
	x0p(getText('取消计时', 'Cancel timing'), getText('你将会丢失计时数据!', 'Are you sure?'), 'warning', function(button){
		if(button == 'warning'){
			resetPaintTime(true);
		}
	});
}

function preSavePaint(){
	if(!isDrawing()){
		x0p(getText('提示', 'Tip'), getText('请先开始计时!', 'Please start timing first'), "info");
		return;
	}
	x0p({
		    title: getText('完成了嘛?', 'Finished?'),
		    text: '',
		    animationType: 'slideUp',
		    icon: 'custom',
		    iconURL: 'svg/info.svg',
		    buttons: [
		    	 {
		            type: 'ok',
		            text: getText('我已经完成!', 'Already Finished'),
		            showLoading: true,
					key: 13
		        },
		        {
		            type: 'error',
		            text: getText('放弃', 'Give up'),
		            key: 46
		        },
		        {
		            type: 'info',
		            key: 27,
		            text: getText('取消', 'Cancel'),
		        }
		    ]
		}).then(function(data) {
			if(data.button == 'ok'){
				_tip_saveFinishWork();
			}else
			if(data.button == 'error'){
				_tip_giveUp();
			}
		});
}

function _tip_saveFinishWork(f = null){
	var error = window.setTimeout(function(){
			x0p(getText('出现错误!', 'error'), getText('保存失败!', 'Save failed!'), "error");
		}, 10000);
	if(saveFinishWork()){
		window.clearTimeout(error);
		window.setTimeout(function(){
			closeMenu();
			x0p(getText('你完成了!', 'You did it!'), getText('保存成功!', 'Saved successfully'), "ok", function(){
				if(typeof(f) == 'function'){
					f();
				}
			});
		}, 1000);
	}
}

function _tip_relax(){
	x0p({
		    title: getText('该休息一下了?', 'Time to rest'),
		    text: getText('连续画了半个小时了,走个半分钟??', 'You have been drawing for half an hour, do you rest for half a minute'),
		    animationType: 'slideUp',
		    icon: 'custom',
		    iconURL: 'svg/info.svg',
		    buttons: [
		    	 {
		            type: 'ok',
		            text: getText('确定!', 'YES'),
		            showLoading: true
		        },
		        {
		            type: 'cancel',
		            text: getText('取消!', 'NO'),
		        }
		    ]
		}, function(button) {
			if(button == 'ok'){
				window.setTimeout(function(){
				x0p('', getText('身体第一!','Health is the most important!'), "ok");
			}, 30000);
			}
		});
}

function timerTask(){
	var now = getNow_s();
	if(g_v_gallery_info.open) g_v_gallery_info.openTime++;
	var stoping = g_v_paint.wating || g_v_paint.data == '';
	// TODO : 如果当前图像为已经画过的则不会再进行提示
		if(stoping){

			if(g_v_gallery_info.open){ // 如果进入图片浏览器则显示打开时间
				setTimeText(_secToTime(g_v_gallery_info.openTime));
			}else{
				setTimeText(_secToTime(now - g_a_log.lastFinish));
			}
			if(g_v_gallery_info.openTime > 0 && g_v_gallery_info.openTime % 300 === 0 && !isSame(g_v_paint.data, g_v_paintData)){

			x0p({
			    title: getText('你正在画画嘛?', 'Whether to start timing'),
			    text: getText('你好像忘记打开了开关,是否要记录?','You seem to forget to turn on the timer, do you want to start recording?'),
			    animationType: 'slideUp',
			    icon: 'custom',
			    iconURL: 'svg/info.svg',
			    buttons: [
			    	 {
			            type: 'ok',
			            text: getText('从打开图像时', 'From opening'),
			        },{
			            type: 'info',
			            text: getText('从现在开始', 'From now'),
			        },{
			            type: 'cancel',
			            text: getText('取消', 'Cancel'),
			        }
			    ]
			}, function(button) {
				if(button == 'ok'){
					startPaint(-1, getNow() - g_v_gallery_info.openTime);
				}else
				if(button == 'info'){
					startPaint();
				}
			});
		}
		return;
	}
	if(!isSame(g_v_paint.data, getViewingJson())){
		if(g_v_gallery_info.openTime % 300 === 0){
			// 打开了另一张图片
			_tip_time();
		}
	}
	var t;
	if(g_v_paint.overTime > 0){
		t = g_v_paint.overTime--;
		if(t <= 0){
			g_v_paint.wating = true;
			// g_v_paint.isStop = true;
			timeOver();
		}
	}else
	if(g_v_paint.isStop){
		t = g_v_paint.resetTime++;
	}else{
		t = g_v_paint.workTime++;

		if(t % 1800 === 0){

			_tip_relax();
		}
	}
	setTimeText(_secToTime(t));
}

function timeOver(){
	x0p({
		    title: getText('时间到', 'The countdown to the end'),
		    text: getText('完成了嘛?','Finished?'),
		    animationType: 'slideUp',
		    icon: 'custom',
		    iconURL: 'svg/info.svg',
		    buttons: [
		    	 {
		            type: 'info',
		            text: getText('是', 'Yes'),
		            showLoading: true
		        },
		         {
		            type: 'cancel',
		            text: getText('否', 'No'),
		        },
		    ]
		}, function(button) {
			if(button == 'info'){
				setTimeout(function(){
					preSavePaint();
					}, 1000);
			}
		});
	}

// 
var g_v_paintLog = getJsonData('paintLog', JSON.stringify({post: {}, title: 'default'}));
var g_v_favorite_list = getJsonData('favorite', JSON.stringify({post: {}, title: 'favorite'}));
var g_a_tags = [];
for(var i in g_v_favorite_list.post){
	var d = g_v_favorite_list.post[i];
	if(d.ctags != undefined){
		for(var tag of d.ctags){
			if(g_a_tags.indexOf(tag) === -1){
				g_a_tags.push(tag);
			}
		}
	}
}
console.log(g_a_tags);

var g_v_favorite_tags = getJsonData('tags', JSON.stringify([]));;

var g_v_paint = _config_paintLog();
// enterReseMode();
window.setInterval(function(){timerTask()}, 1000);

function getJsonData(k, d = '{}'){
	return JSON.parse(getLocalData(k, d));
}

function isNowPating_p(json){
	return isDrawing() && g_v_paint.data.id == json.id &&  g_v_paint.data.host == json.host;
}

// 保存记录
function saveFinishWork(){
	if(g_v_paint.data != ''){
		g_a_log.lastFinish = getNow_s();
		setLocalData('log', JSON.stringify(g_a_log));

		var k = g_v_paint.data.host+'_'+g_v_paint.data.id;
		g_v_paintLog.post[k] = g_v_paint;
		setLocalData('paintLog', JSON.stringify(g_v_paintLog));
		resetPaintTime(true);
		enterReseMode();
		return true;
	}
	return false;
}

function getViewingJson(){
	return g_v_gallery_info.gallery.json;
}
//console.log(getViewingJson());

function startPaint(overTime = -1, startTime = -1, json = ''){
	var vj = getViewingJson();
	if(json == ''){
		json = vj;
		if(json == '') return;
	}
	if(startTime == -1){
		if(!isSame(vj, g_v_paintData) && g_v_gallery_info.openTime > 30){
			// 从另一张图片开始记录
			x0p({
			    title: getText('是否从打开这张图片的时间开始?', 'Whether to start from the time the picture was opened'),
			    text: _secToTime(g_v_gallery_info.openTime),
			    animationType: 'slideUp',
			    icon: 'custom',
			    iconURL: 'svg/info.svg',
			    buttons: [
			    	 {
			            type: 'ok',
			            text: getText('确定', 'YES'),
			        },{
			            type: 'cancel',
			            text: getText('取消', 'NO'),
			        }
			    ]
			}, function(button) {
				if(button == 'ok'){
					// 不会等到点确认才开始执行,所以这里直接更改时间
					startTime = getNow() - g_v_gallery_info.openTime;
					g_v_paint.startTime = startTime;
					g_v_paint.workTime = getNow() - startTime;
				}
			});
		}
		if(startTime == -1) startTime = getNow();
	}
	resetPaintTime(true);
	g_v_paint.overTime = overTime;
	g_v_paint.data = json;
	g_v_paint.startTime = startTime;
	g_v_paint.workTime = getNow() - startTime;
	enterDrawMode();
}

var g_v_paintData; // 最后一张临摹图片的json记录

function resetPaintTime(resetAll = false){
	var log = _config_paintLog();
	if(!resetAll && g_v_paint.data != ''){
		log.data = g_v_paint.data;
	}else{
		resetAll = true;
	}
	g_v_paintData = g_v_paint.data;
	g_v_paint = log;
	if(resetAll) exitrDrawMode();
}

function _config_paintLog(){
	return {
		error: -1, // 保存错误计时器
		wating: false, // 是否再等待用户操作
		isStop: false, // 是否暂停
		startTime: 0, // 开始时间
		resetTime: 0, // 休息时间
		overTime: 0, // 超时时间
		finishTime: 0, // 完成时间
		workTime: 0, // 画画时长
		data: '' // json数据
	};
}

function isDrawing(){
	return g_v_paint.data != '';
}

function switcPause(pause = null){
	if(!isDrawing() || g_v_paint.wating || g_v_paint.overTime > 0) return;
	if(pause == undefined) pause = !g_v_paint.isStop;
	if(pause){
		$('.blooming-menu-up_main-content').css('color', 'red')
	}else{
		$('.blooming-menu-up_main-content').css('color', 'white')
	}
	g_v_paint.isStop = pause;
}

function setTimeText(s_text){
	$('.blooming-menu-up_main-content').html(s_text);
}

// 完成之后的计时器,记录距离上一次完成的时间
function enterReseMode(){
	//$('.blooming-menu-up_main').css('backgroundImage', 'url()');
	$('.blooming-menu-up_main-content').html('').css('color', 'blue')
	//x0p('计时开始', '加油!');
}

function enterDrawMode(){
	//$('.blooming-menu-up_main').css('backgroundImage', 'url()');
	$('.blooming-menu-up_main-content').html('').css('color', 'white')
	//x0p('计时开始', '加油!');
}

function exitrDrawMode(){
	//$('.blooming-menu-up_main').css('backgroundImage', 'url("./svg/hand.svg")');
	$('.blooming-menu-up_main-content').html('').css('color', 'blue')
}

// 完成事件
function finishWork(){
	console.log('finishWork');
	g_v_paint.fashin = true;
	g_v_paint.finishTime = getNow();
	console.log(g_v_paint.finishTime - g_v_paint.startTime);
	enterDrawMode();
}

function closeMenu(){
	if(g_v_selectMenu != undefined) g_v_selectMenu.close();
}

var g_v_selectMenu;
var g_v_touch_start;

function setMoveable(dv){
	//鼠标按下事件
	dv.allowMove = false;
	dv.moved = false;
	dv.onmousedown = function(e) {
	    //获取x坐标和y坐标
		g_v_touch_start = getNow();

	    dv.x = e.clientX;
	    dv.y = e.clientY;

	    //获取左部和顶部的偏移量
	    dv.l = dv.offsetLeft;
	    dv.t = dv.offsetTop;
	    dv.isDown = true;
	    dv.style.cursor = 'move';
	    window.moveMenu = dv;
	}
	window.onmousemove = function(e) {
	    if (window.moveMenu == undefined || window.moveMenu.isDown == false) {
	        return;
	    }
	    var dv = window.moveMenu;
	    if(getNow() - g_v_touch_start > 1500){
	    	dv.allowMove = true;
	    }
	    if (dv.allowMove == false) {
	        return;
	    }
	    var nx = e.clientX;
	    var ny = e.clientY;
	    //计算移动后的左偏移量和顶部的偏移量
	    var nl = nx - (dv.x - dv.l);
	    var nt = ny - (dv.y - dv.t);

	    dv.style.left = nl + 'px';
	    dv.style.top = nt + 'px';
	}
	//鼠标抬起事件
	dv.onmouseup = function(e) {
	    if(dv.allowMove){
	    	dv.moved = true;
	    }
	    window.moveMenu = undefined;
	    dv.isDown = false;
	    dv.allowMove = false;
	    dv.style.cursor = 'pointer';
	}
}

function moveEnd(){

}
