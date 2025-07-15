# DEV_TINDER_FRONTEND

-  Created a vite + React Application
-  Remove unnecessary code and create a Hello World app
-  Installed tailwind css 
-  Install Daisy UI
-  Add NavBar Component to App.jsx
-  Install react-router-dom
-  Create Browser Router  -> Routes -> Route=/Body > RouteChildren
-  Create an outlet 
-  Create a Footer
-  Create a Login Page
-  Install axios
-  CORS - install cors in backend to whitlish apis for communication with frontend by adding middleware using cors     configurations by specifying credentials:true
-  Whenever making an api call in order to retrieve cookie with axios specify set withCredentials : true  
- Install Redux Toolkit https://redux-toolkit.js.org/tutorials/quick-start
-  Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store =>

Body-
    NavBar
    Route=/ ===> Feed
    Route=/login ===> Login
    Route=/connections ===> connections
    Route=/profile ===> Profile 

Create a Login Page


 const switchToLogin = () => {
    setShowEmailExists(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);


      
