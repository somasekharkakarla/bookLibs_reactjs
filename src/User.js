import React from "react";
import { network } from "./Network";
import { withRouter } from "./withRouter";


class User extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            userName:String,
            showError:null,
        }
    }

    callForUserCheck = async()=>{
     const user = await network.checkUserExists(this.state.userName)
     console.warn("callForUserCheck", user)
     if(user.hasOwnProperty('Err')){
        this.setState({
          showError:user.Err
        })
     }else{
          this.props.navigate('/books',{replace:true, state:{user_token:user.token, user:user}})
     }
    }


    render(){
    return(
        <div style={{width:"100%", height:"100vh", backgroundColor:'#ffffff', margin:0, padding:0, display:"flex", justifyContent:'center'}}>
      <div style={{width:'50%', height:'50%', alignSelf:'center', display:'flex'}}>
        <span style={{fontSize:"50px",fontFamily:'Trebuchet MS'}}>Books Libs</span>
        <div style={{width:'50%', height:'50%', alignSelf:'center',display:'flex',flexDirection:'column'}}>
        <span style={{fontSize:"20px",fontFamily:'Trebuchet MS'}}>UserName</span>
        <div style={{display:'flex'}}>
        <div style={{border: '2px solid',borderColor:"red", borderRadius:'6px' ,display:'flex', padding:"5px", marginTop:"10px", width:"60%", height:'40px'}}>
          <input style={{border:'none',outline:'none', fontSize:'16px'}} placeholder='Enter UserName' onChange={event => {
            this.setState({
                userName:event.target.value
            })
          }}/>
        </div>
            <div style={{width:"50px", height:"50px", borderRadius:'50px', backgroundColor:'#4CAF50', alignSelf:'center',marginTop:"10px", marginLeft:"5px", display:'flex', justifyContent:'center'}} onClick={() =>{
              this.callForUserCheck()
            }}>
                <span style={{fontSize:"50px",fontFamily:'Trebuchet MS', textAlign:'center', alignSelf:'center', color:'#fff', marginTop:'-5px'}}>{'>'}</span>
            </div>
        </div>
       {this.state.showError && <span style={{fontSize:"16px",fontFamily:'Trebuchet MS', color:'red'}}>{this.state.showError}</span>}
      </div>
      </div>
     </div>
    )
    }

}

export default withRouter(User)