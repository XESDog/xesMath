/**
 *  [display,{data,updateEventID}]
 */
import {Intersection} from "../../coniferCone/util/Intersection";
import {Line} from "../../coniferCone/geom/Line";
import {LineSegment} from "../../coniferCone/geom/LineSegment";
import {Distance} from "../../coniferCone/util/Distance";

const displayToData = new Map();
let stage = null;
//显示对象
let objs = new createjs.Container();
//交点
let intersections = new createjs.Shape();
//距离
let distances = new createjs.Shape();


function isClass(instance, name) {
    return instance.constructor.name === name;
}

/**
 * 绘制所有交点
 * @param ps
 */
function drawIntersections(ps) {
    let g = intersections.graphics;
    g.clear();
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
    g.clear();
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
    constructor() {

    }

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
            displayToData.set(display, {data: e.data, updateEventID: updateEventID});
        });
        displayToData.set(display, {data: data})
    }

    static remove(display) {
        objs.removeChild(display);
        display.off('update', displayToData.get(display).updateEventID);
        displayToData.delete(display);
    }

    static update() {
        displayToData.forEach((value, key) => {
            key.update(value.data);
        });

        let arr = [...displayToData];
        let len = arr.length;
        let ps = [];//交点
        let ds = [];//距离
        for (let i = 0; i < len; i++) {
            let [, {data: dataA}] = arr[i];
            for (let j = i + 1; j < len; j++) {
                let [, {data: dataB}] = arr[j];
                let p = getIntersection(dataA, dataB);
                let d = getDistance(dataA, dataB);
                if (!!p) ps.push(p);
                if (!!d) ds.push(d);
            }
        }

        if (ps.length > 0) {
            console.log(ps.length);
            drawIntersections(ps);
        }
        if (ds.length > 0) {
            drawDistances(ds);
        }
    }


}
export {World}