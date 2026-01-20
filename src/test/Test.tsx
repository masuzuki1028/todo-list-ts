import { useState } from "react"

export const Todo = () => {
  const [todo, setTodo] = useState<any>([])

    const [title,setTitle] = useState("")
    const [id,setId] =useState<number>(1);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    }

    const onClickAdd = () => {
      setTodo([...todo, {id: id, title: title}])
      setId(id + 1)
      setTitle("")
    }


  return (
    <div>
      <div>
        <input type="text" value={title} onChange={onChangeTitle}/>
        <button onClick={onClickAdd}>Add</button>
      </div>
      {todo.map((todo) => 
       (<div>
        <span>{todo.id}</span>
        <span>{todo.title}</span>
        </div>
      ))}

    </div>
  )
}
