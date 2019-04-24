import "./styles.css";

const createElement = (type, props, children) => {
  const elem = document.createElement(type);

  if (props) {
    const property = Object.keys(props)[0];
    let value = Object.values(props)[0];

    switch (property) {
      case "style":
        let cssProp;
        let cssVal;
        for (let i = 0; i < Object.values(value).length; i++) {
          cssProp = Object.keys(value)[i];
          cssVal = Object.values(value)[i];
          eval(`elem.style.${cssProp} = "${cssVal}";`);
        }
        break;
      case "textContent":
        elem.textContent = value;
        break;
      default:
        elem.setAttribute(property, value);
    }
  }

  if (children) {
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        if (typeof children[i] === "string") {
          elem.innerHTML += children[i];
        } else {
          elem.appendChild(children[i]);
        }
      }
    } else if (typeof children === "string") {
      elem.innerHTML = children;
    }
  }
  return elem;
};

const render = (whatToRender, whereToRender) => {
  whereToRender.appendChild(whatToRender);
};
const React = {
  createElement,
  render
};

const app = React.createElement("div", { style: { backgroundColor: "red" } }, [
  React.createElement("span", undefined, "Hello world"),
  React.createElement("br"),
  "This is just a text node",
  React.createElement("div", { textContent: "Text content" })
]);

React.render(app, document.getElementById("root"));
