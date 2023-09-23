import React, { useState } from "react";

// props
export const RenderList = ({ data, toCheck, trash, toEdit }) => {
  
  const [Task, setTask] = useState(data.task);
  const [Edit, setEdit] = useState(false);


  const handleSave = () => {
    toEdit(data.id, Task)
    setEdit(false)
  }


  console.log(Task)
  return (
    <div
      className={`bg-white flex justify-between space-x-3 border px-[0.7rem] py-[0.5rem] 
      ${data.complete ? "line-through text-red-500" : ""}`}
    >
      <div>
        {Edit ? (
          <input
            value={Task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="border rouded"
          />
        ) : (
          <span>{data.task}</span>
        )}
      </div>
      <div className="space-x-3">
        <input
          checked={data.complete}
          type="checkbox"
          onChange={()=>{toCheck(data.id)}}
        ></input>
        <button
          className="text-black"
          onClick={() => {
            setEdit(!Edit);
          }}
        >
          {Edit ? (
            <span onClick={handleSave}>Save</span>
            
          ) : (
            <i
              className="fa-sharp fa-solid fa-pencil"
              style={{ color: "#FFD700" }}
            ></i>
          )}
        </button>
        <button onClick={()=>{trash(data.id)}}>
          <i className="fa-solid fa-trash" style={{ color: "	#2B547E" }}></i>
        </button>
      </div>
    </div>
  );
};

/* ketika Konsdisi Edit true maka inputan akan muncul & ketika false tidak akan muncul */
/* className="fa-solid fa-square-check" style={{ color: '#ADFF2F' }} */
