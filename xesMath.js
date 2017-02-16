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
    function getParabola(a = 0, b = 0, c = 0, range = null, step = 0) {
        var points = [];
        var y, D, h, k, x;

        if (range !== null) {
            var min = range[0];
            var max = range[1];
            var i = min;
            while (i <= max) {
                y = a * Math.pow(i, 2) + b * i + c;
                if (y < MAX) {
                    points.push(i, y);
                }
                i += step;
            }
        }
        //D>0方程有两个不相等的根
        //D=0方程有两个相等的根
        //D<0方程无实数根，
        D = b * b - 4 * a * c;
        //抛物线顶点为(h,k)
        h = -b / (2 * a);
        k = -D / (4 * a);
        //根，用数组表示
        x = function () {
            var value = [];
            if (D > 0) {
                var sqrtD = Math.sqrt(D);
                value.push((-b + sqrtD) / (2 * a));
                value.push((-b - sqrtD) / (2 * a));
            }
            //TODO:计算机算出来，可能是极小的数，而不是0
            else if (D === 0) {
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
            points: points,
            x: -b / k,
            y:b,
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
     * y=k+b*sinƟ
     * @param h
     * @param k
     * @param a
     * @param b
     * @param step
     * @returns {{points: Array}}
     */
    function getOval(h, k, a, b, step) {
        var points = [];
        var i = 0, x, y;
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
        //和x轴交点
        x = function () {
            var temp = 1 - (k * k) / (b * b);
            var value = [];
            if (temp > 0) {
                temp *= a * a;
                temp = Math.sqrt(temp);
                value.push(temp + h);
                value.push(-temp + h);
            } else if (temp === 0) {
                value.push(h);
            } else {

            }
            return value;
        }();
        //和y轴交点
        y = function () {
            var temp = 1 - (h * h) / (a * a);
            var value = []
            if (temp > 0) {
                temp *= b * b;
                temp = Math.sqrt(temp);
                value.push(temp + k);
                value.push(-temp + k);
            } else if (temp === 0) {
                value.push(k);
            } else {

            }
            return value;
        }();
        return {
            points: points,
            x: x,
            y: y,
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
     * @param divide 坐标轴上的刻度间隔
     * @param divideLine 坐标轴上刻度长
     */
    function drawAxis(context, w, h, divide = 10, divideLine = 6) {
        var halfW = w / 2;
        var halfH = h / 2;
        var i = 0, j = 0;

        function drawLine(k, b, range) {
            draw(context, getLine(k, b, range).points);
        }

        context.save();
        {
            context.strokeStyle = 'red';
            draw(context, getLine(0, 0, [-halfW, halfW]).points);
            i = divide;
            j = -divide;
            while (i < halfW && j > -halfW) {
                drawLine(Math.MAX_VALUE, i, [divideLine, 0]);
                drawLine(Math.MAX_VALUE, j, [divideLine, 0]);
                i += divide;
                j -= divide
            }

            context.translate(halfW, 0);
            drawArrow(context);
        }
        context.restore();

        context.save();
        {
            context.strokeStyle = 'green';
            draw(context, getLine(Math.MAX_VALUE, 0, [-halfH, halfH]).points);
            i = divide;
            j = -divide;
            while (i < halfH && j > -halfH) {
                drawLine(0, i, [divideLine, 0]);
                drawLine(0, j, [divideLine, 0]);
                i += divide;
                j -= divide
            }

            context.translate(0, halfH);
            context.rotate(Math.PI / 2);
            drawArrow(context);
        }
        context.restore();
    }

    function drawArrow(context) {
        context.beginPath();
        context.moveTo(0, -3);
        context.lineTo(6, 0);
        context.lineTo(0, 3);
        context.lineTo(0, -3);
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
