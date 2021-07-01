import React, {ChangeEvent, ChangeEventHandler} from 'react';

type PropsType = {
    status: string,
    updateUserStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean,
    title: string,
    status: string
}


class ProfileStatus extends React.Component<PropsType, StateType> {

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

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
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

