# Three Creative Controls
Three.js noclip camera controls that feel similar to minecraft creative mode. Based on [PointerLockControls](https://threejs.org/docs/#examples/en/controls/PointerLockControls).


Install using npm:
```shell
npm i three-creative-controls
```

## Usage
Import the module
```js
import * as THREE from "three";
import { CreativeControls } from "three-creative-controls"
```

Reference a blocker and menu screen from your html in your code. Create a CreativeControls object and provide your scene camera, renderer and both the menu and blocker element.
Define the movement speed for the controls as a Vector3 object. Default is `200, 200, 200`
```js
const blocker = document.getElementById('blocker');
const menu = document.getElementById('menu');

const creativeControls = CreativeControls.Controls(camera, renderer.domElement, menu, blocker);
const creativeControlsSpeed = new Vector3(200, 200, 200);
```

Run the CreativeControls update function to keep your controls object updated. Pass your controls object and the desired speed vector as parameters.
```js
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  CreativeControls.update(creativeControls, creativeControlsSpeed);
};
```

### Blocker and Menu element
The Blocker element is used as an overlay for your current scene to make the menu more visible. The Menu could feature whatever you want. The sample menu down below just displays the controls.
```html
<div id="blocker">
  <div id="menu">
    <p style="font-size: 36px; color: white">
      Click to play
    </p>
    <p style="font-size: 24px; color: white">
      Move: WASD<br/>
      Fly up: SPACE<br/>
      Fly down: SHIFT
    </p>
  </div>
</div>
```

Styling for the sample blocker and menu:
```CSS
#blocker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
}

#menu {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
```

### Crosshair
Feel free to add a crosshair to your scene if necessary. The easiest approach is the following:
```html
<body>
  <div id="crosshair">
    <img id="crosshairImage" src="./images/crosshair.svg"/>
  </div>
</body>
```
Styling of the crosshair vector graphic:
```css
#crosshair {
  position: fixed;
  pointer-events: none;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
}

#crosshairImage {
  width: 1.5%;
  opacity: 0.8;
  object-fit: cover;
}
```
Refer to the demo if you have any questions.

## Run the Demo
Clone the repository and run
```shell
npm i
npm start
```
The example is available under localhost:3000

![image](https://user-images.githubusercontent.com/64702286/124366062-341f6f80-dc4d-11eb-8257-2659894123f5.png)
