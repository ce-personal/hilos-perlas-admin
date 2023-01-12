import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { auth, ENABLE_AUTH } from '../lib/auth';



const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
	const user = action.payload;

	return {
	  ...state,
	  ...(
		// if payload (user) is provided, then is authenticated
		user
		  ? ({
			isAuthenticated: true,
			isLoading: false,
			user
		  })
		  : ({
			isLoading: false
		  })
	  )
	};
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
	const user = action.payload;

	return {
	  ...state,
	  isAuthenticated: true,
	  user
	};
  },
  [HANDLERS.SIGN_OUT]: (state) => {
	return {
	  ...state,
	  isAuthenticated: false,
	  user: null
	};
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);

	const initialize = async () => {		
		const user = localStorage.getItem("userLogin");
		if (!user || user == "undefined") return dispatch({ type: HANDLERS.INITIALIZE });

		signIn(JSON.parse(user));
	};


	const signIn = (user) => {
		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: user,
		});

		localStorage.setItem("userLogin", JSON.stringify(user));
	};

	const signOut = () => {
		dispatch({
			type: HANDLERS.SIGN_OUT
		});

		localStorage.removeItem("userLogin");
	};


	useEffect(() => {
		initialize()
	}, []);

	return (
		<AuthContext.Provider
		value={{
			...state,
			signIn,
			signOut
		}}
		>

		{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
