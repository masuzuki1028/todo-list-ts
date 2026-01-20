import { useState } from 'react'
import './App.css'
import { Todo } from './test/Test';


type Todo = {
  id: number;
  title: string;
  status: 'notStarted' | 'inProgress' | 'done';
};


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState("")
  const [todoId, setTodoId] = useState(1)
  const [isEditable, setIsEditable] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const onClickAdd = () => {
    setTodos([...todos, { id: todoId, title: todoTitle , status: 'notStarted'}])
    setTodoId(todoId + 1)
    setTodoTitle("");
  };

  const handleDeleteTodo = (targetTodo: Todo) => {
    setTodos(todos.filter((todo) => todo.id !== targetTodo.id));
  };

  const handleStatusChange = ({ id }: { id: number }, e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value as 'notStarted' | 'inProgress' | 'done' } : todo
      )
    );
  };

  const handleOpenEditForm = (todo: Todo) => {
    setIsEditable(true);
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleCloseEditForm = () => {
    setIsEditable(false);
  };

  const handleEditTodo = () => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, title: editTitle } : todo
      )
    );
    setIsEditable(false);
    setEditingId(null);
    setEditTitle("");
  };




  return (
    <>
    <div>
    {!isEditable ? (
        <>
      <input type='text' placeholder="TODO" value={todoTitle} onChange={onChangeTodoText}/>
      <button onClick={onClickAdd}>追加</button>
        </>
      ) : (
        <>
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <button onClick={()=>handleEditTodo()}>編集を保存</button>
          <button onClick={()=>handleCloseEditForm()}>キャンセル</button>
        </>
      )}

    </div>
    <div>
      <p>タスク</p>
      <ul className='todo-list'>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <div className='todo-row'>
              <span>{todo.id}</span>
                <span>{todo.title}</span>
                <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
                <button onClick={() => handleOpenEditForm(todo)}>編集</button>
                <button onClick={() => handleDeleteTodo(todo)}>削除</button>
              </div>
              </li>
          )
        })}
      </ul>
    </div>

    <Todo />
    </>
)
}

export default App


