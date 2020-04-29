
import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux'


// TODO: Repair this HOC. Won't work with Redux. Freezes app in loading state.
const withError = (WrappedComp, axios) => {
    return props => {
        const [error, setError] = useState(null)

        const reqIntercepter = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        })

        const resIntercepter = axios.interceptors.response.use(req => req, err => {
            setError(err);
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqIntercepter);
                axios.interceptors.response.eject(resIntercepter)
            }
        }, [reqIntercepter, resIntercepter])

        const clearErrorHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Modal
                    disabled={error}
                    closeModal={clearErrorHandler} >
                    {error ? error.message : null};
                    </Modal>
                <WrappedComp {...props} />
            </Aux>
        );
    }
}

export default withError
