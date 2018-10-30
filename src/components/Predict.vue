<template>

    <div>
    <el-table :data="probability" style="width: 100%" :cell-class-name="predictStyle">
        <el-table-column prop="index" label="" width="100">              
        </el-table-column>
        <el-table-column prop="gl121" label="GL121-L1" width="140">
        </el-table-column>
        <el-table-column prop="sgl1" label="SG-L1" width="140">
        </el-table-column>
        <el-table-column prop="noregu" label="NO-REGU" width="140">
        </el-table-column>
    </el-table>
    </div>

</template>

<script>
    export default {
        name: 'Predict',
        props: {
            recoResult: {
                type: Array,
                required: true
            },
            probability: {
                type: Array,
                required: true
            },

        },
        data() {
                return {
                }
            },
        methods: {
            predictStyle({ row, column, rowIndex, columnIndex }) {
                if (this.recoResult[columnIndex-1] == rowIndex){
                    console.log(this.recoResult[columnIndex-1], rowIndex)
                    return 'predict';
                }
                else
                    return '';
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
        .el-table .predict {
        background: rgb(201, 241, 201);
    }
</style>