/**
 * Created by work on 2017/3/7.
 */

import data from "./data.json";
import prop from "./property.json";
import coniferCone from "./src/coniferCone/coniferCone";
import {Intersection} from "./src/coniferCone/util/Intersection";


function main() {

    let geoms = [];
    let gui;

    data.forEach((value) => {
        if (value.type === 'circle') {
            let geom = new coniferCone.Circle(value.x, value.y, value.radius);
            geom.type = value.type;
            geom.styleObject = prop[value.type]['styleObject'];
            geoms.push(geom);
        }
        if (value.type === 'lineSegment') {
            let p1 = value.p1.split(',');
            let p2 = value.p2.split(',');
            //类型错了导致dat.GUI不能正常显示数字，一直显示为字符串形式，折腾了几个小时
            let geom = new coniferCone.LineSegment(parseInt(p1[0]), parseInt(p1[1]), parseInt(p2[0]), parseInt(p2[1]));
            geom.type = value.type;
            geom.styleObject = prop[value.type]['styleObject'];
            geoms.push(geom);
        }

        if (value.type === 'rectangle') {
            let geom = new coniferCone.Rectangle(value.x, value.y, value.width, value.height);
            geom.type = value.type;
            geom.styleObject = prop[value.type]['styleObject'];
            geoms.push(geom);
        }
    });


    let circleTemp = {
        props: ['geomData'],
        data: function () {
            return {}
        },
        template: "#circle-template",
        methods: {
            onfocus: function () {
                this.$emit('showgui', {type: 'circle', data: this.geomData});
            },
        }
    };


    let lineTemp = {
        props: ['geomData'],
        data: function () {
            return {}
        },
        template: '#line-template',
        methods: {
            onfocus: function () {
                this.$emit('showgui', {type: 'lineSegment', data: this.geomData});
            }
        }
    };

    let rectangleTemp = {
        props: ['geomData'],
        data: function () {
            return {};
        },
        template: '#rectangle-template',
        methods: {
            onfocus: function () {
                this.$emit('showgui', {type: 'rectangle', data: this.geomData});
            }
        }
    }

    let app = new Vue({
        el: "#stage",
        data: {
            geoms: geoms,

        },
        methods: {
            onShowGUI: function (data) {

                if (gui) {
                    if (gui.domElement.parentElement) {
                        gui.domElement.parentElement.removeChild(gui.domElement);
                    }
                    gui.destroy();
                }
                gui = new dat.GUI({autoPlace: false});
                let p = prop[data.type];
                let d = data['data'];
                for (let [key, value] of Object.entries(p.scopes)) {
                    let index = key.indexOf('.');
                    let path = [];
                    if (index !== -1) {
                        path = key.split('.');
                    } else {
                        path = [key];
                    }


                    let folder = gui;
                    let obj = d;

                    for (let i = 0; i < path.length; i++) {
                        if (i < path.length - 1) {
                            if (folder.__folders[path[i]] === undefined) {
                                folder = folder.addFolder(path[i]);
                                folder.open();
                            } else {
                                folder = folder.__folders[path[i]];
                            }
                            obj = obj[path[i]];
                        } else {
                            folder.add.apply(folder, [obj, path[i]].concat(value));
                        }
                    }
                }
                document.getElementById('datGUI').appendChild(gui.domElement);
            }
        },
        computed: {
            intersections: function () {

                let result = Intersection.detectIntersections(geoms);
                result.map((value) => {
                    value.type = 'circle';//交点显示成圆点
                    value.styleObject = prop[value.type]['styleObject'];
                    value.radius = 4;
                    return value;
                });
                return result;
            }
        },

        components: {
            "circle-template": circleTemp,
            'line-template': lineTemp,
            'rectangle-template': rectangleTemp
        }
    });


}
main();
