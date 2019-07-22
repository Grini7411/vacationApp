import React, { Component } from 'react'
import {Input,Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {raiseRefresh} from '../newFile'


export default class UpdaterM extends Component {
    constructor(props){
        super(props);
        
        this.state= {
            modal:true,
            ID:"",
            picture:[]
            // prevState:this.props.vacation

        }
        this.state = Object.assign(this.state,this.props.vacation)
        console.log(this.state)
        
        this.uploadButton = React.createRef();
    }
    
    toggle() {
        debugger;
        if(this.state.modal ===true){
            this.props.modalHandler();
            debugger;
        }
        this.setState({
          modal: !this.state.modal
        });
        
    };

    

    componentDidMount() {
        console.log(this.state.modal)
        

        var myWidget = window.cloudinary.createUploadWidget(
            {
            cloudName: 'dxyrc1vmi', 
            uploadPreset: 'rmjvy2h4'
            }, 
            (error, result) => { 
            if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info);
                this.setState({picture:result.info.secure_url})
                }
            }
        )
            
        this.uploadButton.current.addEventListener("click", function(){
            myWidget.open();
            }, false);
    }
    componentWillUnmount() {
    console.log('Modal unmount')
}




    render() {
        return (
            
                    <Modal isOpen={this.state.modal}  >
                        <ModalHeader toggle={this.toggle.bind(this)}>Edit vacation</ModalHeader>
                        <ModalBody>
                            <Input placeholder={this.props.vacation.title} name="title" onChange={this.handleChange.bind(this)}/>
                            <Input placeholder={this.props.vacation.description} name="description" onChange={this.handleChange.bind(this)}/>
                            <Input placeholder={this.props.vacation.price} name="price" onChange={this.handleChange.bind(this)}/>
                
                            <button ref={this.uploadButton} className="cloudinary-button">Upload Picture</button>

                            <Input placeholder="Start Date" type='date' name="startDate" onChange={this.handleChange.bind(this)}/>
                            <Input placeholder="End Date" type="date" name="endDate" onChange={this.handleChange.bind(this)}/>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.updateVacation.bind(this)}>Save!</Button>
                            <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

            
        )
    }
    handleChange(ev){
        
        this.setState({[ev.target.name]:ev.target.value})
        let IDref = this.props.cardId;
        this.setState({ID:IDref})

      }

      updateVacation(){
            debugger;
            let sendObj = {...this.state}
            for(let key in sendObj){
                if(sendObj[key].lentgh === 0){
                    sendObj[key] = this.props.vacation[key]
                }
            }
            console.log(sendObj)
            debugger;
            this.toggle();

        
            fetch('http://localhost:3000/vacation/updatevac', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            "Accept":"application/json"},
            body: JSON.stringify(sendObj)
            })
            .then(res => {
                res.json();
                raiseRefresh();

            }) 
            

            

    
    }
}