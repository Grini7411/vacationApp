import React, { Component } from 'react'
import {Input,Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Vacation from './Vacation';


export default class UpdaterM extends Component {
    state = {
        modal:false,
        ID:""
    }

    componentDidMount() {

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
            
            // document.getElementById("upload_widget").addEventListener("click", function(){
            // myWidget.open();
            // }, false);
    }




    render() {
        return (
            <div>
                    <Modal isOpen={this.state.modal} toggle={this.props.toggler} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Edit vacation</ModalHeader>
                        <ModalBody>
                            <Input placeholder="Title" name="title" onChange={this.handleChange.bind(this)}/>
                            <Input placeholder="Description" name="description" onChange={this.handleChange.bind(this)}/>
                            <Input placeholder="Price" name="price" onChange={this.handleChange.bind(Vacation)}/>
                
                            <button id="upload_widget" className="cloudinary-button">Upload Picture</button>

                            <Input placeholder="Start Date" type='date' name="startDate" onChange={this.handleChange.bind(this)}/>
                            <Input placeholder="End Date" type="date" name="endDate" onChange={this.handleChange.bind(this)}/>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.props.updater}>Save!</Button>
                            <Button color="secondary" onClick={this.props.toggler}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

            </div>
        )
    }
    handleChange(ev){
        
        this.setState({[ev.target.name]:ev.target.value})
        let IDref = this.props.cardId;
        this.setState({ID:IDref})

      }


      

}
