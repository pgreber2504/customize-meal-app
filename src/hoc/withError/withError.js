
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'


// TODO: Repair this HOC. Won't work with Redux. Freezes app in loading state.
const withError = (WrappedComp, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqIntercepter = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })

            this.resIntercepter = axios.interceptors.response.use(req => req, err => {
                this.setState({ error: err })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntercepter);
            axios.interceptors.response.eject(this.resIntercepter)

        }

        clearErrorHandler = () => {
            this.setState({ error: null });
        }

        render() {

            return (
                <Aux>
                    <Modal
                        disabled={this.state.error}
                        closeModal={this.clearErrorHandler} >
                        {this.state.error ? this.state.error.message : null};
                    </Modal>
                    <WrappedComp />
                </Aux>
            );
        }
    }
}

export default withError
