<template>
    <div class="row">
        <div class="col-md-6 col-12">
            <lte-card title="Polinomial Gerhana" style="font-size: 13px;">
                <table class="table table-bordered element">
                    <tbody>
                        <tr>
                            <th>DeltaT</th>
                            <td>{{info.deltaT.toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <th>T0</th>
                            <td >{{info.T0 <10?'0'+info.T0:info.T0}}:00</td>
                        </tr>
                        <tr>
                            <th colspan="5">&nbsp;</th>
                        </tr>
                        <tr >
                            <th>&nbsp;&nbsp;</th>
                            <th>0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                        </tr>
                        <tr>
                            <th colspan="5"> Besselian Element</th>
                        </tr>
                        <tr v-for="(vals,name) in series">
                            <th >{{name}}</th>
                            <td  v-for="v in vals">{{v}}</td>
                        </tr>
                        <tr>
                            <th >tanF</th>
                            <td></td>
                            <td >{{info.tanF1.toFixed(8)}}</td>
                            <td >{{info.tanF2.toFixed(8)}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th colspan="5">&nbsp;</th>
                        </tr>
                        <tr>
                            <th colspan="5"> Posisi Matahari</th>
                        </tr>
                        <tr v-for="(vals,name) in sunMoon.sun">
                            <th >{{name}}</th>
                            <td  v-for="v in vals">{{v}}</td>
                        </tr>
                        <tr>
                            <th colspan="5">&nbsp;</th>
                        </tr>
                        <tr>
                            <th colspan="5"> Posisi Bulan</th>
                        </tr>
                        <tr v-for="(vals,name) in sunMoon.moon">
                            <th >{{name}}</th>
                            <td  v-for="v in vals">{{v}}</td>
                        </tr>
                        <tr>
                            <th colspan="5">&nbsp;</th>
                        </tr>
                        <tr>
                            <th colspan="5"> Lain-lain</th>
                        </tr>
                        <tr>
                            <th >GST</th>
                            <td >{{(info.GST0 * 180/Math.PI).toFixed(8)}}</td>
                            <td >15.04106864</td>
                        </tr>
                    </tbody>
                </table>
            </lte-card>
        </div>
    </div>
</template>
<script>
    const {PI, abs} = Math;

    export default {
        props: {
            eclipse: Object,
            info: {
                type: Object,
                default() {
                    return {type: 0, date: null};
                }
            },
        },
        computed: {
            series() {
                const series = ['x', 'y', 'μ', 'd', 'l1', 'l2'];
                const result = {};

                const info = this.info;
                series.forEach(name => {
                    let s = this.info[name].slice(0, 4);
                    if (name == 'μ' || name == 'd') {
                        s = s.map(v => v * 180 / PI);
                    }
                    result[name] = s.map(v => abs(v) > 5e-8 ? v.toFixed(7) : '');
                });
                return result;
            },
            sunMoon() {
                const series = ['ra', 'dec', 'range'];
                const objs = ['sun', 'moon'];
                const result = {};

                const info = this.info;
                objs.forEach(obj => {
                    result[obj] = {};
                    series.forEach(name => {
                        let s = this.info[obj][name].slice(0, 4);
                        if (name == 'ra' || name == 'dec') {
                            s = s.map(v => v * 180 / PI);
                        }
                        result[obj][name] = s.map((v, i) => {
                            if (name == 'range' && i == 0) {
                                return v.toFixed(3);
                            }
                            return abs(v) > 5e-8 ? v.toFixed(7) : ''
                        });
                    });
                });
                return result;
            },
        },
    }
</script>
<style>
    table.element th{
        text-align: center;
    }
    table.element th[colspan]{
        text-align: left;
    }
    table.element td{
        text-align: right;
    }
</style>