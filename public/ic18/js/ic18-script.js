// IC18 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor
/*
1)What is prop-drilling? Describe a situation where it would be a problem without the Context API.
Prop-drilling is where you pass down functions from a parent. It would be hard to do without
context API because nothing would be linked/shared to each other.

2) What are the three things you need to use the Context API? (Create, Provide, Consume — describe each one.)
createContext a shared location for functions. 
Provide makes the functions accessible to one another.  
Consume allows the functions to use each other.

3) In this exercise, ModeToggle changes mode state that lives in App, 
but App never passed toggleMode as a prop. How does ModeToggle get access to it?
Because of the context API linking them all.

4) Where in the file must React.createContext() be called, and why does placement matter?
It needs to be called at the start because the context needs to 
be created before the functions are created and called. It's kind of like
how you need context to join in on a conversation.

5) What would you have to change if you added a fifth component that also needed to read mode?
You'd make one that reads mode.
*/

// --- Context ---

const HabitatContext = React.createContext();

// --- Components ---
const Header = () => {
    const { mode } = React.useContext(HabitatContext);
    return (
        <header>
            <h1>🌎 Pixel's Habitat</h1> 
            <p>{ mode === 'day' ? '☀️ Day Mode' : '🌙 Night Mode' }</p>
        </header>
    );
};

const HabitatView = () => {
    const { mode } = React.useContext(HabitatContext);
    return (
        <div className="scene">
            {mode === 'day' ? '☀️ 🌿 🐾' : '🌙 ⭐️ 🐾'}
        </div>
    );
};

const ModeToggle = () => {
    const { mode, toggleMode } = React.useContext(HabitatContext);
    return (
        <div className="controls">
            <button onClick={toggleMode}>
                { mode === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            </button>
        </div>
    );
};

const App = () => {
    const [mode, setMode] = React.useState('day');
    const toggleMode = () => setMode(prev => prev === 'day' ? 'night' : 'day');

    return (
        // Provier wraps all consumers; value broadcasts mode and toggleMode
        <HabitatContext.Provider value={{ mode, toggleMode }}>
            <div className={"habitat " + mode}>
                <Header /> 
                <HabitatView /> 
                <ModeToggle />
            </div>
        </HabitatContext.Provider>
    );
};

// --- Mount ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);