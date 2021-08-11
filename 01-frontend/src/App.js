import logo from "./logo.svg";
import "./App.css";

const ERROR_WEBSITE = "http://localhost:5001";
const SOLVE_WEBSITE = "http://localhost:5002";
const HEADERS_WEBSITE = "http://localhost:5003";

function App() {
  //#region CORS-error
  const menuRequest = () => {
    fetch(`${ERROR_WEBSITE}/list/menu`)
      .then((res) => {
        console.log("menu request response: ", res);
      })
      .catch((err) => {
        console.log("menu request error: ", err);
      });
  };

  const menuDelete = () => {
    fetch(`${ERROR_WEBSITE}/menu`, {
      method: "POST",
      body: new URLSearchParams({
        id: 3,
      }),
    })
      .then((res) => {
        console.log("menu delete response: ", res);
      })
      .catch((err) => {
        console.log("menu delete error: ", err);
      });
  };
  //#endregion

  //#region solve cors
  const noCorsRequest = () => {
    fetch(`${SOLVE_WEBSITE}/list/menu/no-cors`, {
      mode: "no-cors",
    })
      .then((res) => {
        console.log("no-cors request response: ", res);
      })
      .catch((err) => {
        console.log("no-cors request error: ", err);
      });
  };

  const corsRequest = () => {
    fetch(`${SOLVE_WEBSITE}/list/menu`)
      .then((res) => {
        console.log("cors request response: ", res);
      })
      .catch((err) => {
        console.log("cors request error: ", err);
      });
  };
  //#endregion

  //#region cors headers
  //简单请求
  const corsSimple = () => {
    fetch(`${HEADERS_WEBSITE}/menu/simple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id: 4,
        name: "Log",
        path: "/log",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("cors simple response: ", result);
      })
      .catch((err) => {
        console.log("cors simple error: ", err);
      });
  };

  //非简单请求
  const corsComplex = () => {
    fetch(`${HEADERS_WEBSITE}/menu/complex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 4,
        name: "Log",
        path: "/log",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("cors complex response: ", result);
      })
      .catch((err) => {
        console.log("cors complex error: ", err);
      });
  };

  //非简单请求
  const corsDelete = () => {
    fetch(`${HEADERS_WEBSITE}/menu/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-App-Version": "V1.0",
      },
      body: JSON.stringify({
        id: 3,
      }),
    })
      .then((res) => res.text())
      .then((result) => {
        console.log("cors delete response: ", result);
      })
      .catch((err) => {
        console.log("cors delete error: ", err);
      });
  };

  //携带cookie
  const corsWithCookie = () => {
    fetch(`${HEADERS_WEBSITE}/menu/cookie`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-App-Version": "V1.0",
      },
      body: JSON.stringify({
        id: 3,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("cors cookie response: ", result);
      })
      .catch((err) => {
        console.log("cors cookie error: ", err);
      });
  };

  const corsWithHeader = () => {
    fetch(`${HEADERS_WEBSITE}/header`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-App-Version": "V1.0",
      },
      body: JSON.stringify({
        id: 3,
      }),
    })
      .then((res) => {
        console.log("cors header: ", res.headers.get("X-Service-Version"));
        return res.json();
      })
      .then((result) => {
        console.log("cors header response: ", result);
      })
      .catch((err) => {
        console.log("cors header error: ", err);
      });
  };

  const corsCache = () => {
    fetch(`${HEADERS_WEBSITE}/cache`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-App-Version": "V1.0",
      },
      body: JSON.stringify({
        id: 3,
      }),
    })
      .then((res) => {
        console.log("cors header: ", res.headers.get("X-Service-Version"));
        return res.json();
      })
      .then((result) => {
        console.log("cors cache response: ", result);
      })
      .catch((err) => {
        console.log("cors cache error: ", err);
      });
  };
  //#endregion

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={`${ERROR_WEBSITE}/images/logo.svg`}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="Region error">
          <button onClick={menuRequest}>CORS</button>
          <button onClick={menuDelete}>Delete Menu</button>
        </div>
        <div className="Region solve">
          <button onClick={noCorsRequest}>No CORS</button>
          <button
            onClick={() => {
              window.getMenu(1);
            }}
          >
            Menu1
          </button>
          <button onClick={corsRequest}>CORS Header</button>
        </div>
        <div className="Region headers">
          <button onClick={corsSimple}>Simple</button>
          <button onClick={corsComplex}>Complex</button>
          <button onClick={corsDelete}>Delete</button>
          <button onClick={corsWithCookie}>Cookie</button>
          <button onClick={corsWithHeader}>User-Header</button>
          <button onClick={corsCache}>Cache-Preflight</button>
        </div>
      </header>
    </div>
  );
}

export default App;
