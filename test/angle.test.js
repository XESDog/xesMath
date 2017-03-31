/**
 * Created by work on 2017/3/23.
 */

import {Angle} from "../src/coniferCone/geom/Angle";
import {expect} from "chai";

describe('Angle.normal', function () {
    it('Angle.normal(,true/*角度*/)', function () {
        //角度测试
        expect(Angle.normal(60)).to.equal(60);
        expect(Angle.normal(370)).to.equal(10);
        expect(Angle.normal(-370)).to.equal(350);
    })
    it('Angle.normal(,false/*弧度*/)', function () {
        //弧度测试
        expect(Angle.normal(Math.PI / 3, false)).to.equal(Math.PI / 3);
        expect(Angle.normal(-Math.PI / 3, false)).to.equal(Math.PI * 5 / 3);
        expect(Angle.normal(Math.PI * 5 / 2, false)).to.equal(Math.PI / 2);
    })
});
describe('Angle.prototype', () => {
    it('Angle.prototype.isAcute', () => {
        expect(new Angle(-400).isAcute).to.ok;
        expect(new Angle(-350).isAcute).to.ok;
        expect(new Angle(-270).isAcute).to.not.ok;
        expect(new Angle(-200).isAcute).to.not.ok;
        expect(new Angle(-180).isAcute).to.not.ok;
        expect(new Angle(-120).isAcute).to.not.ok;
        expect(new Angle(-90).isAcute).to.not.ok;
        expect(new Angle(-40).isAcute).to.ok;
        expect(new Angle(0).isAcute).to.ok;
        expect(new Angle(40).isAcute).to.ok;
        expect(new Angle(90).isAcute).to.not.ok;
        expect(new Angle(120).isAcute).to.not.ok;
        expect(new Angle(180).isAcute).to.not.ok;
        expect(new Angle(200).isAcute).to.not.ok;
        expect(new Angle(270).isAcute).to.not.ok;
        expect(new Angle(350).isAcute).to.ok;
        expect(new Angle(400).isAcute).to.ok;
    })
});



