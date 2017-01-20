/**
 * Created by work on 2017/1/18.
 */

define(function () {
    /**
     * 这里的最大最小值主要指坐标，主要考虑是否能显示，并非说明MAX值就很大
     * @type {number}
     */
    var MAX = Number('1E10');
    var MIN = Number('1E-10');

    /**
     * y=ax^2+bx+c
     * @param a
     * @param b
     * @param c
     * @param range
     * @param step
     * @returns {{points: Array}}
     */
    function getParabola(a, b, c, range, step) {
        var points = [];
        var min = range[0];
        var max = range[1];
        var i = min;
        var y, D, h, k, x;
        while (i <= max) {
            y = a * Math.pow(i, 2) + b * i + c;
            if (y < MAX) {
                points.push(i, y);
            }
            i += step;
        }
        //D>0方程有两个不相等的根
        //D=0方程有两个相等的根
        //D<0方程无实数根，
        D = b * b - 4 * a * c;
        //抛物线顶点为(h,k)
        h = -b / 2 * a;
        k = -D / 4 * a;
        //根，用数组表示
        x = function () {
            var value = [];
            if (D > 0) {
                value.push((-b + Math.sqrt(D)) / 2 * a);
                value.push((-b - Math.sqrt(D)) / 2 * a);
            } else if (D = 0) {
                value.push(h);
            } else {

            }
            return value;
        }();
        return {
            points: points,
            D: D,
            h: h,
            k: k,
            x: x,
        }

    }

    /**
     * y=kx+b
     * @param k
     * @param b
     * @param range
     * @returns {{points: Array}}
     */
    function getLine(k, b, range) {
        var points = [];
        var min = range[0];
        var max = range[1];
        //如果斜率无穷，那么range表示为y轴的范围
        if (k === Math.MAX_VALUE) {
            points.push(b, range[0]);
            points.push(b, range[1]);
        } else {
            points.push(min, k * min + b);
            points.push(max, k * max + b);
        }
        return {
            points: points
        };
    }

    /**
     * x=x+r*cosƟ
     * y=y+r*sinƟ
     * @param x
     * @param y
     * @param r
     * @param step
     * @returns {{points: Array}}
     */
    function getCircle(x, y, r, step) {
        return getOval(x, y, r, r, step);
    }

    /**
     * x=h+a*cosƟ
     * y=k+b.sinƟ
     * @param h
     * @param k
     * @param a
     * @param b
     * @param step
     * @returns {{points: Array}}
     */
    function getOval(h, k, a, b, step) {
        var points = [];
        var i = 0;
        var pi2 = Math.PI * 2;
        //小于3份，按3份算
        if (pi2 / step < 3) {
            step = pi2 / 3;
        }
        //均分，避免最后一份小于平均数
        else {
            step = pi2 / Math.floor(pi2 / step);
        }
        while (i <= pi2) {
            points.push(h + a * Math.cos(i), k + b * Math.sin(i));
            i += step;
            //和第一个点连接，形成圆
            if (i > pi2) {
                points.push(h + a * Math.cos(0), k + b * Math.sin(0));
            }
        }
        return {
            points: points
        };
    }

    /**
     * y=a^x
     * @param a(a>0&&a!=1)
     * @param range
     * @param step
     */
    function getPower(a, range, step) {
        if (a <= 0)return {points: []};
        //a===1的情况下，为直线
        if (a === 1)return getLine(0, 1, range)
        var points = [];
        var min = range[0];
        var max = range[1];
        var i = min;
        while (i <= max) {
            var y = Math.pow(a, i);
            if (Math.abs(y) < MAX) points.push(i, y);
            i += step;
        }
        return {
            points: points
        }
    }

    /**
     *
     * @param context
     * @param points
     */
    function draw(context, points) {
        var i = 0;
        context.beginPath();
        context.moveTo(points[0], points[1]);
        while (i < points.length) {
            context.lineTo(points[i], points[i + 1]);
            i += 2;
        }
        context.stroke();
    }

    /**
     * 绘制坐标轴
     * @param context
     * @param w
     * @param h
     */
    function drawAxis(context, w, h) {
        context.save();
        context.beginPath();
        context.strokeStyle = 'red';
        draw(context, getLine(0, 0, [-w / 2, w / 2]).points);
        context.translate(w / 2, 0);
        drawArrow(context);
        context.translate(-w / 2, 0);

        context.strokeStyle = 'green';
        draw(context, getLine(Math.MAX_VALUE, 0, [-h / 2, h / 2]).points);
        context.translate(0, h / 2);
        context.rotate(Math.PI / 2);
        drawArrow(context);
        context.translate(0, -h / 2);
        context.rotate(-Math.PI / 2);

        context.restore();
    }

    function drawArrow(context) {
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(4, 0);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.stroke();
    }

    return {
        getParabola: getParabola,
        getLine: getLine,
        getCircle: getCircle,
        getOval: getOval,
        getPower: getPower,
        draw: draw,
        drawAxis: drawAxis,
    }
});
