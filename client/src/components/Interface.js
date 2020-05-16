import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import "../css/gridpage.css";
import { loaddom } from "../actions/initialActions";
const Interface = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const string = useSelector((state) => state.domReducer.string);
  const dispatch = useDispatch();
  const [elements, setElements] = useState([]);
  const select = (e) => {
    if (elements.includes(Number(e.target.id)))
      return alert("cant select twice");
    setElements((oldArray) => [...oldArray, Number(e.target.id)]);
    document.getElementById(e.target.id).style.background = "rgb(27, 26, 26)";
    document.getElementById(e.target.id).style.color = "wheat";
  };
  let array = [];
  for (var i = 0; i < 100; i++) {
    array.push(1);
  }
  i = 0;

  const logic = () => {
    if (elements.length == 1) {
      let html = document.createElement("div");
      let img = document.createElement("img");
      img.setAttribute("src", url);
      html.appendChild(img);
      html.className = "greed";
      var refy = document.getElementById(`${elements[0]}`);
      refy.after(html);
      refy.remove();
      setElements([]);
    } else {
      let maxy = Math.max(...elements);

      let miny = Math.min(...elements);
      let r1 = Number(("" + miny)[0]);
      let r2 = Number(("" + maxy)[0]);
      let c1 = Number(("" + miny)[1]);
      let c2 = Number(("" + maxy)[1]);

      if (c1 == 0 && c2 == 0) {
        c1 = c2 = 10;
        r1 = r1 - 1;
        r2 = r2 - 1;
      } else if (c2 == 0) {
        c2 = 10;
        r2 = r2 - 1;
      }
      if (!c1 && !c2) {
        c1 = r1;
        c2 = r2;
        r1 = r2 = 0;
      }
      if (!c1 && c2) {
        c1 = r1;
        r1 = 0;
      }
      c2 = c2 + 1;
      r1 = r1 + 1;
      r2 = r2 + 2;
      if (maxy == 100) {
        r2 = 11;
        c2 = 11;
      }
      let row = `${r1}/${r2}`;
      let col = `${c1}/${c2}`;
      let html = document.createElement("div");
      let img = document.createElement("img");
      img.setAttribute("src", url);
      html.appendChild(img);
      html.style.gridColumn = col;
      html.style.gridRow = row;
      html.className = "greed";
      let ref = document.getElementById(`${elements[0]}`);
      ref.after(html);
      for (var i = 0; i < elements.length; i++) {
        document.getElementById(`${elements[i]}`).remove();
      }
      setElements([]);
    }
    console.log(document.querySelector(".grid").innerHTML);
  };
  useEffect(() => {
    async function getdata() {
      await dispatch(loaddom());
    }
    getdata();
    const html = $($.parseHTML(string));
    for (var i = 0; i < html.length; i++) {
      if (html[i].className == "greedy") html[i].onclick = select;
      document.querySelector(".grid").append(html[i]);
    }
  }, []);
  return (
    <div style={{ display: "flex" }} className="interface">
      <div className="grid"></div>
      <div className="right">
        <h1>Test Here</h1>
        <div class="input-block">
          <label for="password" class="input-label">
            Url
          </label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="Enter Url Of Image"
          />
        </div>
        <div class="input-block">
          <label for="password" class="input-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Title of Image"
          />
        </div>
        <h1>now select grids and click on submit</h1>
        <button onClick={logic}>submit</button>
      </div>
    </div>
  );
};

export default Interface;