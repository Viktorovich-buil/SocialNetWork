import React from 'react';



class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        title: 'Hi',
        status: this.props.status
    }
    activateEditMode = () => {
        //console.log('this:', this);
        this.setState({
            editMode: true
        })
        //this.forceUpdate() - принудительная перерисовка (плохой вариант) вместо него setState
        //alert('YO');
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState ({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
        // console.log('componentDidUpdate')
    }

    render() {

        return <div>
            {!this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode}>{this.props.status || '-----'}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input  onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
            </div>
            }
        </div>
    }
}

export default ProfileStatus;


// statusInputRef = React.createRef();

// <input ref={this.statusInputRef} autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>
//
// deactivateEditMode = () => {
//     this.setState({
//         editMode: false
//     });
//     this.props.updateUserStatus(this.statusInputRef.current.value);
// }
// ||
