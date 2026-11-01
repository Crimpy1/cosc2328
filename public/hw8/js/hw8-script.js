// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor



const App = () => {
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [error, setError] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    
    const addTask = () => {
        if (taskName.trim() === '') {
            setError('Task name cannot be empty.');
            return;
        }

        setError('');

        const newTask = { 
            id: Date.now(), 
            name: taskName.trim(),
            priority 
        }

        setTasks([...tasks, newTask]);

        setTaskName('');
        setPriority('Medium');
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

    const clearAll = () => {
        setTasks([]);
    };

    return (
        <div className = "app-container">
            <h1>Tasks</h1>

            <h2>You have {`${tasks.length} task${tasks.length === 1 ? '' : 's'}`}</h2>
            <div className="form-area">
                <input
                    type="text"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    
                />
                {error && <p className="error-message">{error}</p>}
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button className="add-task" onClick={addTask}>Add Task</button>
                {tasks.length > 0 && (<button className = "clear-all" onClick={clearAll}>Clear All</button>)}
            </div>

            <TaskList tasks={tasks} onDelete={deleteTask} />
        </div>
        
    );
    
    


}


const TaskCard = (props) => {
    return (
        <div className="task-card">
            <h2 className={props.task.priority.toLowerCase()}>{props.task.name}</h2>

            <p className={"badge " + props.task.priority.toLowerCase()}>{props.task.priority}</p>

            <button className="delete-button" onClick={() => props.onDelete(props.task.id)}>✕</button>
        </div>
    );
};

const TaskList = (props) => {
    if (props.tasks.length === 0) {
        return <p>No tasks yet - add one above</p>;
    }

    return (
    <div className="task-list">
        {props.tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                onDelete={props.onDelete}
            />
            )
        )}
    </div>
    );
};


const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />)
