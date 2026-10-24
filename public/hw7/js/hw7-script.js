// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor
async function loadRoster() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!response.ok) {
            throw new Error("Could not load roster.");
        }
        const data = await response.json();
        const filteredData = data.results.filter(pokemon => pokemon.name.length < 7);
        const sortedArray = filteredData.sort((a, b) => a.name.length - b.name.length);
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sortedArray} />)
    } catch (error) {
        document.querySelector("#root").innerHTML = "Something went wrong...";
    }

}

loadRoster();


function PokemonCard(props) {
    return (
        <div className="pokemon-card">
            <div className="image-frame">
                <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} alt={props.name} />
            </div>
            <h2>{props.name}</h2>
            <h3>Letters: {props.name.length}</h3>
        </div>
    );
}

function PokemonRoster(props) {
    return (
        props.pokemon.map( (pokemon) =>
            <PokemonCard 
                key={pokemon.name} 
                name={pokemon.name} 
            />
        )
)}

function App(props) {
    return (
        <div className="header">
            <h1>Showing {props.roster.length} short-named Pokemon, shortest name first</h1>
            <PokemonRoster pokemon={props.roster} />
        </div>);
}