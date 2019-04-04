/**
 * Created by Administrator on 2019/4/3.
 */
/**
 * 运动函数
 * startMove
 * @param obj 运动对象
 * @param json 运动的属性，如：width、height、left……
 * @param run 运动方式
 *        run.way:不填或为false，则匀速运动，否则变速运动；
 *        run.speed:匀速运动的速度
 *        run.rate:变速运动的速率，>0,减速；<0,加速
 * @param fn 可缺省，回调函数，让其中一个运动完，再让另一个进行运动
 * 注意：进行运动的属性，在样式中要有定义，否则会出错
 */
function startMove(obj,json,run,fn){
    clearInterval(obj.timer);
    var curr = 0;
    var speed = 0;
    if(!run.way){//匀速运动
        speed = run.speed;
    }

    obj.timer = setInterval(function(){
        var flag = true;
        for(var attr in json){
            var target = json[attr];
            if(attr == 'opacity'){
                curr = Math.round(css(obj,'opacity') * 100);
            }else{
                curr = parseInt(css(obj,attr));
            }

            if(run.way){//缓冲运动、摩擦运动，速度越来越小
                speed = (target - curr) / run.rate;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            }

            if(curr != target){
                flag = false;
                if(attr == 'opacity'){
                    obj.style.opacity = (curr + speed) / 100;
                    obj.style.filter = 'alpha(opacity='+ (curr + speed) +')';
                }else{
                    obj.style[attr] = curr + speed + 'px';
                }
            }
        }

        if(flag){
            clearInterval(obj.timer);
            fn && fn.call(obj);
        }
    },30);
}

/**
 * 获取对象的属性值
 * css
 * @param obj
 * @param attr
 * @returns {*}
 */
function css(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}