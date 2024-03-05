import TodoList from './components/TodoList'
import './App.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My To Do list</Typography>
      </Toolbar>
    </AppBar>
      <TodoList />
    </>
  )
}

export default App
