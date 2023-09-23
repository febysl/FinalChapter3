import React, { useEffect } from "react";
import { useState } from "react";
import { RenderList } from "./RenderList";

export const TodoSearch = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [dataPertama, setDataPertama] = useState([])
  const [dataBaru, setDataBaru] = useState([])
  
  // data array yang akan digunakan
  const [data, setData] = useState([
    {
      id: 1,
      task: "Nyuci mobil",
      complete: true,
    },
    {
      id: 2,
      task: "Memberi makan kucing",
      complete: true,
    },
    {
      id: 3,
      task: "Olahraga 10 menit",
      complete: false,
    },
    {
      id: 4,
      task: "Sarapan sereal",
      complete: true,
    },
    {
      id: 5,
      task: "Belanja harian",
      complete: false,
    },
    {
      id: 6,
      task: "Ngeprint tugas",
      complete: true,
    },
    {
      id: 7,
      task: "Bayar tagihan bulanan",
      complete: true,
    },
    {
      id: 8,
      task: "Berangkat kuliah",
      complete: false,
    },
    {
      id: 9,
      task: "Les bahasa Inggris",
      complete: true,
    },
    {
      id: 10,
      task: "Ke rumah Sabrina",
      complete: false,
    },
  ]);

  //untuk menghandle input search 
  const getData = () => {
    setDataPertama([...data]);
    setDataBaru([...data]);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = () => {
    // Menggunakan metode toLowerCase biar peka huruf besar/kecil
    const searchData = search.toLowerCase();
    const newData = dataPertama.filter((d) =>
      d.task.toLowerCase().includes(searchData)
    );
    setData(newData);
  };
  
  // untuk menghandle button reset
  const handleReset = () => {
    setSearch("");
    setInput("");
    setFilter("all");
    setData([...dataPertama]);
  };

  // untuk menghandle checkbox
  const toCheck = (checkId) => {
    const newData = data.map((d) => {
      if (d.id === checkId) {
        return { ...d, complete: !d.complete };
      }
      return d;
    });
    setData(newData);
    console.log(newData);
  };

  // untuk menghanle delete pada setiap komponen array
  const trash = (checkId) => {
    const newData = data.filter((d) => d.id !== checkId);
    setData(newData);
  };

  // untuk menghandle delete semua todo list
  const deleteAll = () => {
    setData([]);
  };

  // untuk menghandle delete todo list yang sudah dilakukan
  const deleteDone = () => {
    const newData = data.filter((d) => !d.complete);
    setData(newData);
  };

  // untuk menghandle edit pada komponen array
  const toEdit = (checkId, newText, onEdit = false) => {
    const newData = data.map((d) => {
      if (d.id === checkId) {
        return { ...d, task: newText, onEdit };
      }
      return d;
    });
    setData(newData);
  };

  // untuk menampilkan todo list
  const tampilList = () => {
    let newData = data;
    if (filter === "todo") {
      newData = newData.filter((d) => !d.complete);
    } else if (filter === "done") {
      newData = newData.filter((d) => d.complete);
    }
    return newData;
  };

  const filterData = tampilList();

  // untuk menambahkan todo list secara dinamis
  const add = (newTask) => {
    setData([...data, { id: Date.now(), task: newTask, complete: false }]);
  };

  // untuk menghandle button saat menambahkan todo list
  const handleAdd = () => {
    add(input);
    setInput("");
  };

  const renderList = () => {
    return filterData.map((value) => {
      return (
        <RenderList
          data={value}
          key={value.id}
          toCheck={toCheck}
          trash={trash}
          toEdit={toEdit}
        />
      );
    });
  };

  return (
    <div className=" p-10 flex justify-center items-center flex-col ">
      <div className="bg-gradient-to-r from-sky-100 to-slate-50 p-10 border rounded flex flex-col gap-4">
        <div className="bg-gradient-to-r from-violet-200 to-pink-200 flex flex-col justify-center items-center border p-2 rounded  space-y-2">
          <h1 className="flex justify-center font-bold text-lg">TodoSearch</h1>
          <input
            className="border rounded w-[22.1rem] h-[2.2rem] "
            type="text"
            placeholder="Search Todo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <div>
            <div className="flex gap-5">
              <button
                className= " bg-cyan-900 text-white text-sm px-[4rem] py-[0.4rem] rounded"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="border border-cyan-900 bg-white text-cyan-900 text-sm px-[4rem] py-[0.4rem] rounded"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-200 to-violet-300 flex flex-col justify-center items-center border p-2 rounded  space-y-2">
          <h1 className="flex justify-center font-bold text-lg">TodoInput</h1>
          <input
            className=" border rounded w-[22.1rem] h-[2.2rem] "
            type="text"
            value={input}
            placeholder="Input Todo"
            onChange={(e) => setInput(e.target.value)}></input>
          <div>
            <div className="flex justify-between">
              <button
                className="bg-cyan-900 text-white text-sm px-[10rem] py-[0.4rem] rounded "
                type="button"
                onClick={handleAdd}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="flex py-2 justify-center text-lg font-semibold">
            TodoList
          </h1>
          <div className="flex gap-10">
            <button
              className="bg-cyan-900 text-white text-sm px-[5rem] py-[0.4rem] rounded"
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className="bg-cyan-900 text-white text-sm px-[5rem] py-[0.4rem] rounded"
              onClick={() => setFilter("done")}
            >
              Done
            </button>
            <button
              className="bg-cyan-900 text-white text-sm px-[5rem] py-[0.4rem] rounded"
              onClick={() => setFilter("todo")}
            >
              Todo
            </button>
          </div>
        </div>
        <div className="py-10">
          <div className=" flex flex-col space-y-4">{renderList()}</div>
        </div>
        <div className="flex justify-between">
          <button
            className="border border-cyan-900 bg-white text-black text-sm px-[6.5rem] py-[0.4rem] rounded"
            onClick={() => {
              deleteDone();
            }}
          >
            Delete done task
          </button>
          <button
            className="border border-cyan-900 bg-white text-cyan-900 text-sm px-[6.5rem] py-[0.4rem] rounded"
            onClick={() => {
              deleteAll();
            }}
          >
            Delete all task
          </button>
        </div>
      </div>
    </div>
  );
};
