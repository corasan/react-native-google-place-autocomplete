import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import {
    func,
    number,
    object,
    objectOf,
    any
} from 'prop-types';
import debounce from 'lodash.debounce';

class AutocompleteInput extends Component {
    static propTypes = {
        custom: object,
        debounce: number,
        onChangeText: func.isRequired,
        onChangeTextSettle: func.isRequired,
        inputStyle: objectOf(any),
        inputContainerStyle: objectOf(any)
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {custom = {}, ...props} = this.props;

        return (
            <View style={this.props.inputContainerStyle}>
                <TextInput
                    {...props}
                    onChangeText={this._handleChangeText}
                    style={this.props.inputStyle} />
            </View>
        );
    }

    _handleChangeText = (value) => {
        this.props.onChangeText(value);
        this._settle();
    }

    _settle = debounce(() => {
        this.props.onChangeTextSettle();
    }, this.props.debounce);
}

export default AutocompleteInput;
