import React from "react";
import { withRouter } from "./withRouter";
import {useLocation} from 'react-router-dom';

class Books extends React.Component{

    constructor(props){
        super(props)
        console.log("props", this.props.location)
        this.state={
            bookTitle: String,
            bookSummary: String,
            createBookIsEnabled: Boolean
        }
    }

    componentDidMount(){
        this.setState({
            createBookIsEnabled:true
        })
    }

    renderCreateBook = () =>{
        return  <div style={{display:'flex', flexDirection:'column', marginTop:'20px'}}>
        <span style={{fontSize:"32px",fontFamily:'Trebuchet MS'}}>Create Book</span>
        <div style={{width:'100%',height:'1px', backgroundColor:'#F57C00', marginBottom:'20px'}}/>
        <div style={{display:'flex', height:'100px', overflow:"hidden"}}>
           <div style={{flex: 1, display:'flex'}}>
           <div style={{height:'40px', width:'30%',flexDirection:'column', flex:1}}>
           <span style={{fontSize:"26px",fontFamily:'Trebuchet MS'}}>Title</span>
           <div style={{border: '2px solid',borderColor:"red", borderRadius:'6px' ,display:'flex', padding:"5px", marginTop:"10px", width:"60%", height:'40px'}}>
           <input style={{border:'none',outline:'none', fontSize:'16px'}} placeholder='Enter Book Title' onChange={event => {
               this.setState({
                   bookTitle:event.target.value
               })
           }}/>
           </div>
           </div>
           <div style={{height:'40px', width:'30%',flexDirection:'column', flex:1}}>
           <span style={{fontSize:"26px",fontFamily:'Trebuchet MS'}}>Summary</span>
           <div style={{border: '2px solid',borderColor:"red", borderRadius:'6px' ,display:'flex', padding:"5px", marginTop:"10px", width:"60%", height:'40px'}}>
           <input style={{border:'none',outline:'none', fontSize:'16px'}} placeholder='Enter Book Summary' onChange={event => {
                       this.setState({
                           bookSummary:event.target.value
                       })
           }}/>
           </div>
           </div>
           </div>
           <div style={{width:"50px", height:"50px", borderRadius:'50px', backgroundColor:'#4CAF50', alignSelf:'center',marginLeft:"5px", display:'flex', justifyContent:'center'}}
           onClick={() =>{
               console.log("create book")
           }}>
           <span style={{fontSize:"50px",fontFamily:'Trebuchet MS', textAlign:'center', alignSelf:'center', color:'#fff', marginTop:'-5px'}}>{'>'}</span>
           </div>
        </div>
        </div>
    }

    renderBooksList = () =>{
        return <div style={{display:'flex', flexDirection:'column', flex: 1}}>
             <span style={{fontSize:"36px",fontFamily:'Trebuchet MS', marginTop:'20px', marginBottom:'5px'}}>Books List</span>
             <div style={{width:'100%',height:'1px', backgroundColor:'#F57C00'}}/>
             <table style={{borderCollapse:"collapse",width:'100%', fontFamily:"arial, sans-serif", marginTop:"10px"}}>
            <thead>
            <tr>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>Books</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>Summary</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>Created by</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>Created On</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>   </th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",maxWidth:'100px'}}>Books</td>
            <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",maxWidth:'200px'}}>sadfadssadfadss</td>
            <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>Created by</td>
            <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>Created On</td>
            <td style={{border: "2px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>Edit</td>
            </tr>
            </tbody>
             </table>
        </div>
    }

    render(){
        const {createBookIsEnabled} = this.state
        return(
            <div style={{width:"100%", height:"100vh", backgroundColor:'#ffffff', margin:0, padding:0, display:"flex", justifyContent:'center'}}>
                 <div style={{width:'90%', height:'100vh', display:'flex', flexDirection:'column'}}>
                   <div style={{display:'flex'}}>
                 <span style={{fontSize:"40px",fontFamily:'Trebuchet MS', marginTop:'50px', flex:1}}>Books</span>
                 <span style={{fontSize:"26px",fontFamily:'Trebuchet MS', marginTop:'50px', alignSelf:'center'}}>{`Hi ${this.props.location.state.name}`}</span>
                 </div> 
                    {createBookIsEnabled && this.renderCreateBook()}
                    {this.renderBooksList()}
                 </div>
            </div>
        )
    }

}
export default withRouter(Books)