/**
 *  [display,{data,updateEventID}]
 */
import {Intersection} from "../../coniferCone/util/Intersection";
import {Line} from "../../coniferCone/geom/Line";
import {LineSegment} from "../../coniferCone/geom/LineSegment";
import {Distance} from "../../coniferCone/util/Distance";

//key:display,value={data:object,updateEventID:string}
const display_data = new Map();
let stage = null;
//显示对象容器
let objs = new createjs.Container();
//交点集合
let intersections = new createjs.Shape();
//距离集合
let distances = new createjs.Shape();


function isClass(instance, name) {
    return instance.constructor.name === name;
}

function clearIntersections() {
    let g = intersections.graphics;
    g.clear();
}
function clearDistances() {
    let g = distances.graphics;
    g.clear();
}
/**
 * 绘制所有交点
 * @param ps
 */
function drawIntersections(ps) {
    let g = intersections.graphics;
    ps.forEach(value => {
        g.setStrokeStyle(1);
        g.beginStroke('#0f0');
        g.drawCircle(value.x, value.y, 4);
    })
}
/**
 * 绘制所有距离
 * @param ds
 */
function drawDistances(ds) {
    let g = distances.graphics;
    ds.forEach(value => {
        let {startP, endP} = value;
        g.setStrokeStyle(1);
        g.setStrokeDash([5, 5], 0);
        g.beginStroke('#f00');
        g.moveTo(startP.x, startP.y);
        g.lineTo(endP.x, endP.y);
    })
}

/**
 * 获取a，b的交点
 * 如果a、b类型相同，则执行一次，如果a、b类型不同，则交换执行
 *
 *
 * @param a
 * @param b
 */
function getIntersection(a, b) {
    let fun = function (a, b) {
        if (isClass(a, 'Line') && isClass(b, 'Line')) {
            return Intersection.lineToLine(a, b);
        }
        if (isClass(a, 'LineSegment') && isClass(b, 'LineSegment')) {
            return Intersection.lineSegmentToLineSegment(a, b);
        }
        if (isClass(a, 'Circle') && isClass(b, 'Circle')) {
            return Intersection.circleToCircle(a, b);
        }
        return null;

    };
    let fun2 = function (a, b) {
        if (isClass(a, 'Line') && isClass(b, 'LineSegment')) {
            return Intersection.lineToLineSegment(a, b);
        }
        if (isClass(a, 'Line') && isClass(b, 'Circle')) {
            return Intersection.lineToCircle(a, b);
        }
        return null;
    };


    if (a.constructor.name === b.constructor.name) {
        return fun(a, b);
    } else {
        let result = fun2(a, b);
        if (!result) {
            result = fun2(b, a);
        }
        return result;
    }
}
/**
 * 获取距离
 * @param a
 * @param b
 */
function getDistance(a, b) {
    let fun = function (a, b) {
        let startP;
        let endP;
        if ((isClass(a, 'Point') || isClass(a, 'Vector') ) && isClass(b, "Line")) {
            startP = a;
            endP = Distance.pointToLine(a, b).intersection;
            return {startP: startP, endP: endP};
        }
        if ((isClass(a, "Point") || isClass(a, 'Vector')) && (isClass(a, "Point") || isClass(a, 'Vector'))) {
            startP = a;
            endP = b;
            return {startP: startP, endP: endP};
        }
        if ((isClass(a, "Point") || isClass(a, 'Vector')) && isClass('LineSegment')) {
            startP = a;
            endP = Distance.pointToLineSegment(a, b).intersection;
            return {startP: startP, endP: endP};
        }
        if (isClass(a, 'Circle') && isClass(b, 'Circle')) {
            startP = a.center;
            endP = b.center;
            return {startP: startP, endP: endP};
        }
    };
    if (a.constructor.name === b.constructor.name) {
        return fun(a, b);
    } else {
        let result = fun(a, b);
        if (!result) {
            result = fun(b, a);
        }
        return result;
    }

}


class World {
    static init(st) {
        stage = st;
        stage.on('tick', World.update);

        stage.addChild(objs);
        stage.addChild(intersections);
        stage.addChild(distances);
    }

    static add(display, data) {
        objs.addChild(display);
        let updateEventID = display.on('update', e => {
            if (display_data.has(e.target)) {
                let obj = display_data.get(e.target);
                obj.data = e.data;
            }
        });
        display_data.set(display, {data, updateEventID})
    }

    static remove(display) {
        objs.removeChild(display);
        display.off('update', display_data.get(display).updateEventID);
        display_data.delete(display);
    }

    static update() {
        display_data.forEach((value, key) => {
            key.update(value.data);
        });

        let arr = [...display_data];
        let len = arr.length;
        let ps = [];//交点
        let ds = [];//距离

        for (let i = 0; i < len; i++) {
            let [, {data: dataA}] = arr[i];
            for (let j = i + 1; j < len; j++) {
                let [, {data: dataB}] = arr[j];
                let p = getIntersection(dataA, dataB);
                let d = getDistance(dataA, dataB);
                if (!!p) {
                    if (p instanceof Array) {
                        ps = ps.concat(p);
                    } else {
                        ps.push(p);
                    }
                }
                if (!!d) ds.push(d);
            }
        }

        clearIntersections();
        clearDistances();

        if (ps.length > 0) {
            drawIntersections(ps);
        }
        if (ds.length > 0) {
            drawDistances(ds);
        }
    }
}
export {World}