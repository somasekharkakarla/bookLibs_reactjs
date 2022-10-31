import React from "react";
import { withRouter } from "./withRouter";
import {useLocation} from 'react-router-dom';
import { network } from "./Network";


class Books extends React.Component{

    constructor(props){
        super(props)
        console.log("props", this.props.location)
        this.state={
            bookTitle: '',
            bookSummary: '',
            bookId:'',
            createBookIsEnabled: !this.props.location.state.user.user.is_viewAll,
            canEdit:this.props.location.state.user.user.is_creator,
            booksList:[],
            createError:null,
            showCreateDialog:false,
            isUpdateBook:false
        }
    }

    async componentDidMount(){
       await this.getBooksList()
    }

    getBooksList = async() =>{
        await network.getBooksList(this.props.location.state.user_token).then((books) =>{
            this.setState({
                booksList:books,
                createError:null,
                showCreateDialog:false,
                bookTitle: '',
                bookSummary: '',
                bookId:''
            })
        })
    }

    createBook = async() =>{
        const {bookTitle, bookSummary} = this.state
        await network.createBook(bookTitle, bookSummary, this.props.location.state.user_token).then((book) =>{
            if(!book.hasOwnProperty('Err')){
                this.getBooksList()
            }else{
                this.setState({
                    createError:book.Err,
                })
            }
        })
    }

    deleteBook = async(id) =>{
        await network.deleteBook(id, this.props.location.state.user_token).then((book) =>{
            if(!book.hasOwnProperty('Err')){
                this.getBooksList()
            }else{
                this.setState({
                    createError:book.Err,
                })
            }
        })
    }

    updateBook = async() =>{
        const {bookTitle, bookSummary, bookId} = this.state
        await network.updateBook(bookId,bookTitle, bookSummary, this.props.location.state.user_token).then((book) =>{
            if(!book.hasOwnProperty('Err')){
                this.getBooksList()
            }else{
                this.setState({
                    createError:book.Err,
                })
            }
        })
    }

    renderCreateBook = () =>{
        const {createError, bookTitle, bookSummary, isUpdateBook} = this.state;
        return  <div style={{display:'flex', flexDirection:'column', margin:'20px', alignSelf:'center'}}>
            <div style={{display:'flex'}}>
        <span style={{fontSize:"32px",fontFamily:'Trebuchet MS', flex:1}}>{`${isUpdateBook?'Update Book':'Create Book'}`}</span>
        <span style={{fontSize:"32px",fontFamily:'Trebuchet MS', color:'red', marginTop:"-20px", cursor: 'pointer'}} onClick={() =>{
                this.setState({
                    showCreateDialog:false,
                    bookTitle: '',
                bookSummary: '',
                bookId:'',
                createError:null
                })
        }}>X</span>
        </div>
        <div style={{width:'100%',height:'1px', backgroundColor:'#F57C00', marginBottom:'20px'}}/>
        <div style={{display:'flex', height:'100px', overflow:"hidden"}}>
           <div style={{flex: 1, display:'flex'}}>
           <div style={{height:'40px', width:'50%',flexDirection:'column', flex:1, margin:5}}>
           <span style={{fontSize:"26px",fontFamily:'Trebuchet MS'}}>Title</span>
           <div style={{border: '2px solid',borderColor:"red", borderRadius:'6px' ,display:'flex', padding:"5px", marginTop:"10px", height:'40px'}}>
           <input style={{border:'none',outline:'none', fontSize:'16px', overflow:'hidden', backgroundColor:'#fff000'}} value={bookTitle} placeholder='Enter Book Title' onChange={event => {
               this.setState({
                   bookTitle:event.target.value
               })
           }}/>
           </div>
           </div>
           <div style={{height:'40px', width:'50%',flexDirection:'column', flex:1, margin:5}}>
           <span style={{fontSize:"26px",fontFamily:'Trebuchet MS'}}>Summary</span>
           <div style={{border: '2px solid',borderColor:"red", borderRadius:'6px' ,display:'flex', padding:"5px", marginTop:"10px", height:'40px'}}>
           <input style={{border:'none',outline:'none', fontSize:'16px', overflow:'hidden',backgroundColor:'#fff000'}} value={bookSummary} placeholder='Enter Book Summary' onChange={event => {
                       this.setState({
                           bookSummary:event.target.value
                       })
           }}/>
           </div>
           </div>
           </div>
           <div style={{width:"50px", height:"50px", borderRadius:'50px', backgroundColor:'#4CAF50', alignSelf:'flex-end',marginLeft:"5px", marginBottom:'5px',display:'flex', justifyContent:'center', cursor: 'pointer'}}
           onClick={() =>{
                if(bookTitle.length > 0 && bookSummary.length >= 10){
                   !isUpdateBook? this.createBook():this.updateBook()
                }else{
                    this.setState({
                        createError: "Book title should have atleast 1 character and Book summary should have atleast 10 character"
                    })
                }
           }}>
           <span style={{fontSize:"50px",fontFamily:'Trebuchet MS', textAlign:'center', alignSelf:'center', color:'#fff', marginTop:'-5px'}}>{'>'}</span>
           </div>
        </div>
          {createError && <span style={{fontSize:"16px",fontFamily:'Trebuchet MS', color:'red', textAlign:'right', alignSelf:'center', textAlign:'center'}}>{createError}</span>}
        </div>
    }

    renderBooksList = () =>{
        const {createBookIsEnabled, booksList, canEdit} = this.state
        return <div style={{display:'flex', flexDirection:'column', flex: 1}}>
           <div style={{display:'flex'}}>  
            <span style={{fontSize:"36px",fontFamily:'Trebuchet MS', marginTop:'20px', marginBottom:'5px'}}>Books List</span>
            {createBookIsEnabled && <div style={{width:"40px", height:"40px", borderRadius:'40px', backgroundColor:'#4CAF50', alignSelf:'center',marginLeft:"5px", display:'flex', justifyContent:'center',cursor: 'pointer'}}
           onClick={() =>{
               this.setState({
                    showCreateDialog:true
               })
           }}>
           <span style={{fontSize:"40px",fontFamily:'Trebuchet MS', textAlign:'center', alignSelf:'center', color:'#fff', marginTop:'-5px'}}>{'+'}</span>
           </div>}
           </div>
             <div style={{width:'100%',height:'1px', backgroundColor:'#F57C00'}}/>
             <table style={{borderCollapse:"collapse",width:'100%', fontFamily:"arial, sans-serif", marginTop:"10px"}}>
            <thead>
            <tr>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>Books</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>Summary</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>Created by</th>
            <th style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word", }}>Created On</th>
            </tr>
            </thead>
            <tbody>
                {console.log(booksList)}
            {booksList.map((book, index) =>
                <tr>
                <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",maxWidth:'100px'}}>{book.title}</td>
                <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",maxWidth:'200px'}}>{book.summary}</td>
                <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>{book.createdBy}</td>
                <td style={{border: "1px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",}}>{book.createdOn}</td>
               {canEdit && <td style={{border: "2px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",cursor: 'pointer'}}><a onClick={() =>{
                this.setState({
                    bookTitle: book.title,
                    bookSummary: book.summary,
                    isUpdateBook: true,
                    showCreateDialog:true,
                    bookId: book._id
                })
               }}>Edit</a></td>}
               {canEdit && <td style={{border: "2px solid #dddddd",textAlign: "left",padding: "18px", whiteSpace:"pre-wrap", wordWrap:"break-word",color:'red',cursor: 'pointer'}}><a onClick={() =>{this.deleteBook(book._id)}}>Delete</a></td>}
                </tr>
            )}
            </tbody>
             </table>
        </div>
    }

    render(){
        const {showCreateDialog} = this.state
        return(
            <div style={{width:"100%", height:"100vh", backgroundColor:'#ffffff', margin:0, padding:0, display:"flex", justifyContent:'center'}}>
                 <div style={{width:'90%', height:'100vh', display:'flex', flexDirection:'column'}}>
                   <div style={{display:'flex'}}>
                 <span style={{fontSize:"40px",fontFamily:'Trebuchet MS', marginTop:'50px', flex:1}}>Books</span>
                 <span style={{fontSize:"26px",fontFamily:'Trebuchet MS', marginTop:'50px', alignSelf:'center'}}>{`Hi ${this.props.location.state.user.user.name}`}</span>
                 </div>
                 {showCreateDialog && <div style={{position:'absolute',left: "0",right: "0", marginLeft: "auto", marginRight: "auto", backgroundColor:'#fff000', display:'flex', width:'30%', height:'30%', justifyContent:'center', borderRadius:5, boxShadow:'5px 10px #E3F2FD', z:100}}>
                    {this.renderCreateBook()}
                    </div> }
                    {this.renderBooksList()}
                 </div>
            </div>
        )
    }

}
export default withRouter(Books)