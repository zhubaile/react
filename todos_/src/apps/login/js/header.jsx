import React, { Component } from "react";

export default class Header extends Component {
    constructor(props) {
        super(props);
        // 、、 后面 没听清 value 对 但是是空，有这一行 对的
        // 就是 value 为空 怎么消除吗？
        this.state = {
            newTodo: [
                {
                    isChecked: true,
                    value: "",
                }
            ],
            isCheckedAll:false,
            status:"up",
            defalutValue: null
        }
        this.inputAdd = this.inputAdd.bind(this)
        this.inputChang = this.inputChang.bind(this)
        this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this)
        this.checkBoxChange=this.checkBoxChange.bind(this)
        this.clickDel=this.clickDel.bind(this)
        this.toggleAll=this.toggleAll.bind(this)
        this.toggleActive=this.toggleActive.bind(this)
        this.toggleEnd=this.toggleEnd.bind(this)
        this.toggleUp=this.toggleUp.bind(this)
        this.clearAll=this.clearAll.bind(this)
    };
    /*改变lablede的值*/
    inputChang() {
        this.setState({
            defalutValue: this.myInput.value
        });
    }
    /*合并数组，把input的值给到lable中，然后input的值清空*/
    inputAdd() {
        if(!this.myInput.value)return null;
        this.setState({
            newTodo: [].concat(this.state.newTodo, {
                isChecked:false,//改成默认不选中
                value: this.myInput.value
            }),
            defalutValue: ""
        });
    }
    /*键盘回车事件*/
    handleNewTodoKeyDown(event) {
        //先进入到这里了
        if (event.keyCode == 13) {
            this.inputAdd()
        }
        return true
    }

    toggleAll() {
        this.setState({
          isCheckedAll:!this.state.isCheckedAll,
            newTodo:this.state.newTodo.map((v)=>{
                if (this.state.isCheckedAll == false) {
                    return {isChecked: true, value: v.value}
                }
                if (this.state.isCheckedAll == true) {
                    return {isChecked: false, value: v.value}
                }
            })
        });
        debugger;
    }
    toggleUp(){
        this.setState({
            status:"up"
        });
    }
    toggleActive(){
        this.setState({
            status:"active"
        })
    }
    toggleEnd(){
        this.setState({
            status:"end"
        })
    }
    clearAll(){
        var newTodoArr=this.state.newTodo;
        this.setState({
            newTodo:newTodoArr.map(function(v,i){
            if(v.isChecked==true){return {v:null}}
                return v
        })
        });
    }
    checkBoxChange(event,index){
        var newTodoArr=this.state.newTodo;
        this.setState({
            newTodo:newTodoArr.map(function(v,i){
            if(i==index){return {isChecked:!v.isChecked,value:v.value}}
            return v
        })
        });

    }

    clickDel(index){
       //this.setState({ this.state.newTodo(index).value:{newTodo.value.splice()};});
        //this.state.newTodo(index).value==null;
        // this.state.newTodo 的第 index个 数值删除即可
            //this.state.newTodo(index).value.splice();
            var newTodoArr=this.state.newTodo;
        this.setState({
            newTodo:newTodoArr.map(function(v,i){
            if(i==index){return {v:null}}
            return v
        })
        });
    }
    render() {
        var newTodo = this.state.newTodo;
        var checkedLength=0;
        this.state.newTodo.map(function(v,i){
            if(v.isChecked==false){
                checkedLength=checkedLength+1
            }
        });
        return (
            <div id="all">
                <div className="header">
                    <h1>todos</h1>
                    <input className="header-todo"
                        value={ this.state.defalutValue }
                        onKeyUp={ this.handleNewTodoKeyDown }
                        onChange={this.inputChang}
                        ref={ (input) => this.myInput = input }
                        autoFocus={ true }
                        placeholder="What needs to be done?" />
                </div>
                <div className="center">
                    {
                        this.state.isCheckedAll?
                            (<input className="center-all" type="checkbox" onChange={ (v)=>this.toggleAll(v) } checked/>)
                            :
                            (<input className="center-all" type="checkbox" onChange={(v)=> this.toggleAll(v) }/>)
                    }
                    <ul>
                        {
                            newTodo.length ? newTodo.map((value,index)=>{
                                //这里还有一个 index 是索引
                                // 模板里面写判断。所有判断可以这里写。
                                let returnDom=(
                                    <div>
                                        <div>
                                            <li>
                                                <input type="checkbox" className="toggle" checked={value.isChecked?"":null} onChange={ (e)=>this.checkBoxChange(e,index) }/>
                                                {
                                                value.isChecked ?
                                                    (<input type="checkbox" className="toggle" checked onChange={ (e)=>this.checkBoxChange(e,index) }/>)
                                                    :
                                                    (<input type="checkbox" className="toggle" onChange={ (e)=>this.checkBoxChange(e,index) }/>)
                                            }
                                                <label className={value.isChecked?"error":""}>{ value.value }</label>
                                                <button className="destroy" onClick={ () => { this.clickDel(index)}}>×</button>
                                            </li>
                                        </div>
                                    </div>
                                );
                                if (!value.value)return null;
                                if(this.state.status=="up"){
                                    return returnDom
                                }else if(this.state.status=="active"){
                                    if(value.isChecked==false){
                                        return returnDom
                                    }
                                }else if( this.state.status=="end"){
                                    if(value.isChecked==true){
                                        return returnDom
                                    }
                                }
                            }) : null
                        }
                    </ul>
                </div>
                <div className="fander">
                    <span className="fander-num"><strong>{ checkedLength }</strong>个项目</span>
                    <div className="fander-btn">
                        <div className="fander-btn-box">
                            <button className="btn one" onClick={this.toggleUp}>所有</button>
                            <button className="btn two" onClick={this.toggleActive}>未完成</button>
                            <button className="btn three" onClick={this.toggleEnd}>已完成</button>
                        </div>
                    </div>
                    <div className="fander-end clearfix" onClick={this.clearAll}>清理完成</div>
                </div>
            </div>
        )
    };
};


