/**
 * Created by work on 2017/3/23.
 */

import {Line} from "../src/coniferCone/geom/Line";
import {expect} from "chai";


describe('Line.construct',function () {
    expect(new Line(5).x).to.equal(5);
})