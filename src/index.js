import "./styles.css";

const srcl = document.getElementById("srcl");
const svg = document.getElementById("svg");

let charge = 0;
let interval = null;
const app = document.getElementById("app");
// let distance = [srcl.getAttribute("cx"), srcl.getAttribute("cy")];
let distance = [0, 0];

const addLabel = (x, y, text) => {
  let label = document.createElementNS("http://www.w3.org/2000/svg", "text");

  // const label = document.createElement("text");
  label.innerHTML = text;
  label.classList.add("label");
  label.setAttribute("x", x);
  label.setAttribute("y", y);
  svg.appendChild(label);
};

for (let i = 1; i < 7; i++) {
  addLabel(-50, i * -100, i * 100);
  addLabel(i * 100, 0, i * 100);
}

const original = null;
const state = {
  state: "init",
  // on: (event)=> new Promise((res, rej)=>{
  //     res(event)
  //  })

  redraw: function () {
    srcl.setAttribute("cx", distance[0] * 400);
    srcl.setAttribute("cy", distance[1] * 100);
    //,
  },
  flying: () => {
    const currDate = Date.now();

    const elapsed = currDate - state.flyStart;

    distance[0] += ((elapsed / 10000) * charge.X) / 100;

    distance[1] +=
      (distance[0] * charge.Y) / 100 - Math.pow(distance[0] * 1.3, 2);

    const text = document.createElement("text");

    text.innerHTML = "sdfsdf";
    text.setAttribute("x", distance[0]);
    text.setAttribute("y", distance[1]);
    text.classList.add("label");
    svg.appendChild(text);

    if (distance[1] < -0) {
      distance = [0, 0];
      // state.redraw();
      console.log("down");
      clearInterval(interval);
      interval = null;
      return;
    }

    state.redraw();
    console.log(`distance: ${distance}`);
  },
  //
  // },

  on: (event) => {
    switch (event) {
      case "init":
        state.state = "init";
        state.charge = null;

        break;

      case "fly":
        state.state = "fly";
        state.flyStart = Date.now();
        interval = setInterval(state.flying, 15);
        distance = [0, 0];

        // distance[0] = srcl.getAttribute("cx") * 100;

        // setTimeout(() => {
        //   console.log("ostanovites");
        //   clearInterval(interval);
        //   interval = null;
        //   console.log("inteval cleared");
        // }, 3000);

        break;

      case "charge":
        state.state = "charge";
        break;
      default: {
      }
    }
  }
};

// let state = stateEnum.Init;

function reset() {
  state.on("init");
}

srcl.addEventListener("mousedown", (e) => {
  e.stopImmediatePropagation();
  state.on("charge");
  // console.log(state);

  // console.log("a")
});

svg.addEventListener("mouseup", (e) => {
  e.stopImmediatePropagation();

  if (state.state === "charge") {
    const { right, left, bottom, top } = srcl.getBoundingClientRect();

    charge = { X: left - e.clientX + 20, Y: 0 - (bottom - e.clientY) + 20 };

    state.on("fly");
    // console.log(state);
  }
});

svg.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
});

document.getElementById("body").addEventListener("click", () => {
  reset();
});
