import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";



describe ('ProfileStatus component', () => {
    test ('status from props should be in the state', () => {
        const component = create (<ProfileStatusWithHooks status='Yo' />);
        const instance = component.getInstance();
        expect (instance.state.status).toBe('Yo')
    });
});


test ('after creation <span> should be displayed', () => {
    const component = create (<ProfileStatusWithHooks status='Yo' />);
    const root = component.root
    let span = root.findByType('span')
    expect (span).not.toBeNull();
});

test ('after creation <input> shouldn`t be displayed', () => {
    const component = create (<ProfileStatusWithHooks status='Yo' />);
    const root = component.root

    expect (() => {
        let input = root.findByType('input')
    }).toThrow();
});


test ('after creation <span> should contains correct status', () => {
    const component = create (<ProfileStatusWithHooks status='Yo' />);
    const root = component.root;
    let span = root.findByType('span')
    expect (span.children[0]).toBe('Yo');
});

test ('input should be displayed in editMode instead of', () => {
    const component = create (<ProfileStatusWithHooks status='Yo' />);
    const root = component.root;
    let span = root.findByType('span')
    span.props.onDoubleClick();
    let input = root.findByType('input')
    expect (input.props.value).toBe('Yo');
});

test ('callback should be called', () => {
    const mockCallBack = jest.fn()
    const component = create (<ProfileStatusWithHooks status='Yo' updateStatus ={mockCallBack} />);
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect (mockCallBack.mock.calls.length).toBe(1);
});
