import * as THREE from 'three';
import { Vector3 } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export var CreativeControls = CreativeControls || {}

CreativeControls.moveForward = false;
CreativeControls.moveBackward = false;
CreativeControls.moveUp = false;
CreativeControls.moveDown = false;
CreativeControls.moveLeft = false;
CreativeControls.moveRight = false;

CreativeControls.Controls = (camera, dom, menu, blocker) => {
    const controls = new PointerLockControls(camera, dom);

    menu.addEventListener('click', function () {
        controls.lock();
    } );

    controls.addEventListener('lock', function () {
        menu.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        menu.style.display = '';
    } );

    const onKeyDown = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                CreativeControls.moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                CreativeControls.moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                CreativeControls.moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                CreativeControls.moveRight = true;
                break;
            case 'Space':
                CreativeControls.moveUp = true;
                break;
            case 'ShiftLeft':
                CreativeControls.moveDown = true;
                break;
        }
    };

    const onKeyUp = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                CreativeControls.moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                CreativeControls.moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                CreativeControls.moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                CreativeControls.moveRight = false;
                break;
            case 'Space':
                CreativeControls.moveUp = false;
                break;
            case 'ShiftLeft':
                CreativeControls.moveDown = false;
                break;
        }

    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);


    return controls;
}

CreativeControls.velocity = new THREE.Vector3();
CreativeControls.direction = new THREE.Vector3();
CreativeControls.prevTime = performance.now();

CreativeControls.update = (controls, speed) => {
    const time = performance.now();

    if(!speed) {
        speed = new Vector3(200.0, 200.0, 200.0);
    }

    if (controls.isLocked === true ) {
        const delta = (time - CreativeControls.prevTime) / 1000;

        
        CreativeControls.velocity.x -= CreativeControls.velocity.x * 10.0 * delta;
        CreativeControls.velocity.z -= CreativeControls.velocity.z * 10.0 * delta;
        CreativeControls.velocity.y -= CreativeControls.velocity.y * 10.0 * delta;
        

        CreativeControls.direction.z = Number( CreativeControls.moveForward ) - Number( CreativeControls.moveBackward );
        CreativeControls.direction.x = Number( CreativeControls.moveRight ) - Number( CreativeControls.moveLeft );
        CreativeControls.direction.y = Number( CreativeControls.moveDown ) - Number( CreativeControls.moveUp );
        CreativeControls.direction.normalize(); // this ensures consistent movements in all directions

        if ( CreativeControls.moveForward || CreativeControls.moveBackward ) CreativeControls.velocity.z -= CreativeControls.direction.z * speed.z * delta;
        if ( CreativeControls.moveLeft || CreativeControls.moveRight ) CreativeControls.velocity.x -= CreativeControls.direction.x * speed.x * delta;
        if ( CreativeControls.moveUp || CreativeControls.moveDown ) CreativeControls.velocity.y -= CreativeControls.direction.y * speed.y * delta;

        controls.moveRight( - CreativeControls.velocity.x * delta );
        controls.moveForward( - CreativeControls.velocity.z * delta );
        

        controls.getObject().position.y += ( CreativeControls.velocity.y * delta ); // up down

    }

    CreativeControls.prevTime = time;

}