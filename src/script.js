/* Code has been written for educational purposes.
    Project for ICG class, done using Threejs-journey course by Bruno Simon
*/

import './style.css'
import * as THREE from 'three' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
//we cannot acces to draco loader using gltf loader so we have to import 
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'dat.gui'



/* LOADERS ----------------- */
//We have to instantiate DracoLoader before the gltf loader 
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./assets/draco/')  
/*now our draco loader will use faster version with web assembly with worker   
"Workers let you put a part of your code in a different thread to spread the load." - source: course
*/

const gltfLoader = new GLTFLoader() //we are instantiating the loader
gltfLoader.setDRACOLoader(dracoLoader)
//the draco loader instance to the gltf loader 

gltfLoader.load(
    './assets/models/room3.glb',
    (gltf)=>
    {
        gltf.scene.position.set(0,0,0)
        gltf.scene.scale.set(2,2,2)
        scene.add(gltf.scene)
    }
)


/* DEBUG ----------------- */
const gui = new dat.GUI()

/* CANVAS ----------------- */
const canvas = document.querySelector('canvas.webgl')

/* SCENE ----------------- */
const scene = new THREE.Scene()

/* FLOOR  ----------------- */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(7,7),
    new THREE.MeshStandardMaterial(
        {
            color: '#444444',
            metalness: 0,
            roughness: 0.5
        })
)
floor.receiveShadow = true   //this floor receive shadow 
floor.rotation.x= - Math.PI *0.5 //z pionowego ustawienia podloga jest teraz pozioma 
scene.add(floor)


/* MODELS ----------------- */
// const geometry = new THREE.BoxGeometry(0.1,0.1,0.1)
// const material = new THREE.MeshBasicMaterial ({color: 0xff9900})
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(0,0.5,0)
// //scene.add(mesh)


/* LIGHTS ----------------- */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff,0.4)
directionalLight.castShadow = true
directionalLight.position.set(5,5,5)
scene.add(directionalLight)


const spotLight = new THREE.SpotLight(0x78ff00, 5, 10, Math.PI * 0.1, 0.25)
                              //color, intensity, distance, angle,  penumbra- półcień )
spotLight.position.set(0,2,3)
scene.add(spotLight)

const spotLightCameraHelper = new THREE.SpotLightHelper(spotLight)
gui.add(spotLight.position, 'x').min(-5).max(5).step(0.001).name('spotlightX')
gui.add(spotLight.position, 'y').min(-5).max(5).step(0.001).name('spotlightY')
gui.add(spotLight.position, 'z').min(-5).max(5).step(0.001).name('spotlightZ')


const rectAreaLight = new THREE.RectAreaLight(0x0000ff, 40, 4,1)
                            //color, intensity, width, height)
rectAreaLight.rotation.y=  Math.PI *0.5
rectAreaLight.position.set(1,0,0.328)
scene.add(rectAreaLight)

gui.add(rectAreaLight.position, 'x').min(-5).max(5).step(0.001).name('rectAreaLightX')
gui.add(rectAreaLight.position, 'y').min(-5).max(5).step(0.001).name('rectAreaLightY')
gui.add(rectAreaLight.position, 'z').min(-5).max(5).step(0.001).name('rectAreaLightZ')


//const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
//rectAreaLight.add( rectAreaLightHelper )



/* SIZES ----------------- */
const sizes = {
width: window.innerWidth,
height: window.innerHeight
}

window.addEventListener('resize', () =>  //code understand when is the resizing and what to do 
{
    //Update sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    camera.aspect = sizes.width/sizes.height //aspect ratio
    camera.updateProjectionMatrix()  //without this camera the object is squezed 
    //Update renderer 
    renderer.setSize(sizes.width,sizes.height)

}   
)

/* CAMERA ----------------- */
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1,100)
camera.position.set(2,2,2)
scene.add(camera)

/* CONTROLS ----------------- */
const controls = new OrbitControls(camera, canvas)
//controls.target.y =-2
controls.enableDamping = true //po przesunieciu ekranu nie zatrzymuje sie on od razu tylko po chwili 


/* RENDERER ----------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap 
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera) 

/* ANIMATIONS ----------------- */
const clock = new THREE.Clock() 
let previousTime = 0 


const tick = () =>  //A tick is the dequeuing of an event from the "event loop queue" and the execution of said event
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    /* deltaTime contains the time difference between the beginning 
    of the previous frame and the beginning of the current frame in milliseconds. */
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()