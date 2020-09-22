import React, {createContext, useState} from 'react';
import api from '../api_manager';
import AsyncStorage from '@react-native-community/async-storage';


const AuthContext = createContext();
const { Provider } = AuthContext;

const userModel = {
    // loginId: '',
    password: '',
    phoneNumber: '',
    email: '',
    firstName: '',
    profileImage: '',
    account: '',
    gubun: '', // 01: 보호자, 02: 돌보미
    gubunDolbomi: '', // 01: 아이돌보미, 02: 노인돌보미
    gubunDolbomiKids: '', // 01: 대학생, 02: 보육교사, 03: 특기교사
    chatToken: '',
};

const AuthContextProvider = (props) => {
    const [user, _setUser] = useState(userModel);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const addUserInfo = async (values) => {
        await _setUser(Object.assign({}, user, values));
    };

    const fetchProfile = async () => {
        let res = await api.get('v1/me/info/');

        if(!res.ok){
            _setUser(userModel);
            setIsAuthenticated(false);
            return false
        }
        _setUser(res.data);
        AsyncStorage.setItem('chatToken', res.data[0].chatToken);
        setIsAuthenticated(true);
        return res.data;
    };

    const patchProfile = async (values) => {
        let res = await api.patch('v1/me/info/', values);
        if(!res.ok){return false}
        _setUser(res.data);
        return true
    };

    const state = {user, isAuthenticated};
    const actions = {fetchProfile, patchProfile, addUserInfo};

    return (
        <Provider value={{...state, ...actions }}>
            {props.children}
        </Provider>
    )
};

const withAuthContext = ChildComponent => props => (
    <AuthContext.Consumer>
        {
            context => <ChildComponent {...props} auth={context}  />
        }
    </AuthContext.Consumer>
);

export {
    AuthContext,
    AuthContextProvider,
    withAuthContext,
};
