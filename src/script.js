/* 
Project name: Magical room 
Student number: 106740
Code has been written for educational purposes. 
I've created the model in Blender for different course project - LM4, and the textures were provided by the teacher.
Project1 for ICG class, done using Threejs-journey course by Bruno Simon, youtube(Working with Three.js Particle Systems - They're AWESOME!) 
by DesignCourse, a lot of stackoverflow, examples from ICG class and three.js documentation. 
*/

/*--------------------------- IMPORT --------------------------------------------------------------------  */

import './style.css'
import * as THREE from 'three' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
//we cannot acces to draco loader using gltf loader so we have to import it 
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'dat.gui'


const parameters = {color: 0xff0000} //instantiate variable for changing color in gui folder 

/*--------------------------- LOADERS -------------------------------------------------------------------- */

//We have to instantiate DracoLoader before the gltf loader  //from threejs-journey course
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./assets/draco/')  
/*now our draco loader will use faster version with web assembly with worker   
"Workers let you put a part of your code in a different thread to spread the load." - source: threejs-journey course */

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
        //console.log('room3.glb') 
    }
) 
//the hamburger model that is in the folder was created also using blender to check if the models overall can be uploaded 
//hamburger model done using tutorial from threejs-journey 

/*--------------------------- DEBUG -------------------------------------------------------------------- */

const debugObject = {}   //its like containter - to put smth inside - in this case color 
const gui = new dat.GUI({closed:false})   //Debug controls are open when we enter the site 


/*---------------- CREATING FOLDERS ----------------- */
const sunFolder = gui.addFolder('Sun')
// const rectAreaLightFolder = gui.addFolder('Water1')
// const rectAreaLight2Folder = gui.addFolder('Water2')
// const rectAreaLight3Folder = gui.addFolder('Water3')
const waterFolder = gui.addFolder('Water')
waterFolder
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        rectAreaLight.color.set(parameters.color)
        rectAreaLight2.color.set(parameters.color)
        rectAreaLight3.color.set(parameters.color)  
    })


const Candle1Folder = gui.addFolder('Candle1')  //Pointlight for candle 1
const Candle2Folder = gui.addFolder('Candle2')  //Pointlight for candle 2
const Candle3Folder = gui.addFolder('Candle3')  //Pointlight for candle 3
const Candle4Folder = gui.addFolder('Candle4')  //Pointlight for candle 4
const LiliaFolder = gui.addFolder('Lilia')  //Pointlight for Lilia


/*--------------------------- CANVAS ----------------- */
const canvas = document.querySelector('canvas.webgl')


/*--------------------------- SCENE ----------------- */
const scene = new THREE.Scene()


/*--------------------------- FLOOR  -------------------------------------------------------------------- */

// const floor = new THREE.Mesh(                                   //from threejs-journey course 
//     new THREE.PlaneGeometry(7,7),                               //now the floor is not needed -> commented
//     new THREE.MeshStandardMaterial(
//         {
//             color: '#201818',
//         })
// )
// floor.receiveShadow = true   //this floor receive shadow     
// floor.rotation.x= - Math.PI *0.5 //from vertical the floor is now horizontal 
//scene.add(floor)


/*--------------------------- GROUPS -------------------------------------------------------------------- */

const sungGroup = new THREE.Group()
scene.add(sungGroup)

const candle1Group = new THREE.Group()  //pointlight
scene.add(candle1Group)
const candle2Group = new THREE.Group()  //pointlight2
scene.add(candle2Group)
const candle3Group = new THREE.Group()  //pointlight3
scene.add(candle3Group)
const candle4Group = new THREE.Group()  //pointlight4
scene.add(candle4Group)
const LiliaGroup = new THREE.Group()  //pointlight5 - Lilia 
scene.add(LiliaGroup)
const waterGroup = new THREE.Group()
scene.add(waterGroup)


/*--------------------------- MODELS -------------------------------------------------------------------- */

//SPHERE THAT SHOWS POSITION OF THE LIGHT - learned from lesson 4 ICG
const sphereGeometry = new THREE.SphereGeometry(0.1,15,15)
                            //radius, widthSegments, heightSegments, 
const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00})
const directionalLightSphere = new THREE.Mesh (sphereGeometry, sphereMaterial)
directionalLightSphere.position.set(0,1,0)
sungGroup.add(directionalLightSphere)


//Sphere for candle1 
const sphere1Geometry = new THREE.SphereGeometry(0.01,15,15)
                            //radius, widthSegments, heightSegments, 
const sphere1Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere1 = new THREE.Mesh (sphere1Geometry, sphere1Material)
pointLightSphere1.position.set(0,0,0)
candle1Group.add(pointLightSphere1)
candle1Group.position.set(-2.65,1,-1)  //ideal position for the candle 


//Sphere for candle2
const sphere2Geometry = new THREE.SphereGeometry(0.01,15,15)
                            //radius, widthSegments, heightSegments, 
const sphere2Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere2 = new THREE.Mesh (sphere2Geometry, sphere2Material)
pointLightSphere2.position.set(0,0,0)
candle2Group.add(pointLightSphere2)
candle2Group.position.set(3.25,1.1,-0.75)  //ideal position for the candle 

//Sphere for candle3
const sphere3Geometry = new THREE.SphereGeometry(0.01,15,15)
                            //radius, widthSegments, heightSegments, 
const sphere3Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere3 = new THREE.Mesh (sphere3Geometry, sphere3Material)
pointLightSphere3.position.set(0,0,0)
candle3Group.add(pointLightSphere3)
candle3Group.position.set(-1.4,3.2,-6)  //ideal position for the candle 

//Sphere for candle4
const sphere4Geometry = new THREE.SphereGeometry(0.01,15,15)
                            //radius, widthSegments, heightSegments, 
const sphere4Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere4 = new THREE.Mesh (sphere4Geometry, sphere4Material)
pointLightSphere4.position.set(0,0,0)
candle4Group.add(pointLightSphere4)
candle4Group.position.set(3.6,3.2,-4)  //ideal position for the candle 

//Sphere for lilia1
const sphereLiliaGeometry = new THREE.SphereGeometry(0.05,15,5)
                            //radius, widthSegments, heightSegments, 
const sphereLiliaMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphereLilia = new THREE.Mesh (sphereLiliaGeometry, sphereLiliaMaterial)
pointLightSphereLilia.position.set(0,0,0)
LiliaGroup.add(pointLightSphereLilia)
LiliaGroup.position.set(0.6,0.35,0.95)  //ideal position for the candle 



/*--------------------------- LIGHTS -------------------------------------------------------------------- */

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)  //looks better without 
//scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
directionalLight.castShadow = true
directionalLight.position.set(4,4,4)
sungGroup.add(directionalLight)
sunFolder.add(directionalLight, 'intensity')
sunFolder.add(sungGroup, 'visible')
//sunFolder.add(sungGroup.position, 'x').min(-5).max(5).step(0.001).name('SunX') //commented because I've found the best position
//sunFolder.add(sungGroup.position, 'y').min(-5).max(5).step(0.001).name('SunY')
sunFolder.add(sungGroup.position, 'z').min(-5).max(5).step(0.001).name('SunZ')

//Point light for the candle1
const pointLight = new THREE.PointLight(0xffffff0, 0.2, 20)
pointLight.position.set = (0,0,0)
candle1Group.add(pointLight)

Candle1Folder.add(candle1Group, 'visible')
// Candle1Folder.add(candle1Group.position, 'x').min(-5).max(5).step(0.001).name('pointLightX')  //commented because I've found the best position
// Candle1Folder.add(candle1Group.position, 'y').min(-5).max(5).step(0.001).name('pointLightY')
// Candle1Folder.add(candle1Group.position, 'z').min(-10).max(0).step(0.001).name('pointLightZ')


//Point light for the candle2
const pointLight2 = new THREE.PointLight(0xffffff0, 0.2, 15)
pointLight2.position.set = (0,0,0)
candle2Group.add(pointLight2)

Candle2Folder.add(candle2Group, 'visible')
// Candle2Folder.add(candle2Group.position, 'x').min(-5).max(5).step(0.001).name('pointLightX')  //commented because I've found the best position
// Candle2Folder.add(candle2Group.position, 'y').min(-5).max(5).step(0.001).name('pointLightY')
// Candle2Folder.add(candle2Group.position, 'z').min(-5).max(5).step(0.001).name('pointLightZ')

//Point light for the candle3
const pointLight3 = new THREE.PointLight(0xffffff0, 0.2, 15)
pointLight3.position.set = (0,0,0)
candle3Group.add(pointLight3)

Candle3Folder.add(candle3Group, 'visible')
// Candle3Folder.add(candle3Group.position, 'x').min(-5).max(5).step(0.001).name('pointLightX')  //commented because I've found the best position
// Candle3Folder.add(candle3Group.position, 'y').min(-5).max(5).step(0.001).name('pointLightY')
// Candle3Folder.add(candle3Group.position, 'z').min(-5).max(5).step(0.001).name('pointLightZ')


//Point light for the candle4
const pointLight4 = new THREE.PointLight(0xffffff0, 0.2, 15)
pointLight4.position.set=(0,0,0)
candle4Group.add(pointLight4)

Candle4Folder.add(candle4Group, 'visible')
// Candle4Folder.add(candle4Group.position, 'x').min(-5).max(5).step(0.001).name('pointLightX')  //commented because I've found the best position
// Candle4Folder.add(candle4Group.position, 'y').min(-5).max(5).step(0.001).name('pointLightY')
// Candle4Folder.add(candle4Group.position, 'z').min(-5).max(5).step(0.001).name('pointLightZ')


//Point light for the Lilia 
const pointLightLilia = new THREE.PointLight(0xfffff00, 0.2, 15)
pointLightLilia.position.set=(0,0,0)
LiliaGroup.add(pointLightLilia)

LiliaFolder.add(LiliaGroup, 'visible')
// LiliaFolder.add(LiliaGroup.position, 'x').min(-5).max(5).step(0.001).name('pointLightX')  //commented because I've found the best position
// LiliaFolder.add(LiliaGroup.position, 'y').min(-5).max(5).step(0.001).name('pointLightY')
// LiliaFolder.add(LiliaGroup.position, 'z').min(-5).max(5).step(0.001).name('pointLightZ')


/*---------------- WATER ----------------- */

const rectAreaLight = new THREE.RectAreaLight(0x0000ff, 30, 3,1.5)
                            //color, intensity, width, height)
rectAreaLight.rotation.y=  Math.PI *0.5
rectAreaLight.position.set(1,-0.17,0.328)
waterGroup.add(rectAreaLight)

// waterFolder.add(rectAreaLight.position, 'x').min(-5).max(5).step(0.001).name('rectAreaLightX')  //commented because I've found the best position
// waterFolder.add(rectAreaLight.position, 'y').min(-5).max(5).step(0.001).name('rectAreaLightY')
// waterFolder.add(rectAreaLight.position, 'z').min(-5).max(5).step(0.001).name('rectAreaLightZ')


const rectAreaLight2 = new THREE.RectAreaLight(0x0000ff, 30, 4,1)
                            //color, intensity, width, height)
rectAreaLight2.rotation.y=  Math.PI *0.5
rectAreaLight2.position.set(1,2.5,-4.4)
waterGroup.add(rectAreaLight2)

//waterFolder.add(rectAreaLight2, 'visible')
// waterFolder.add(rectAreaLight2.position, 'x').min(-5).max(5).step(0.001).name('rectAreaLight2X') //commented because I've found the best position
// waterFolder.add(rectAreaLight2.position, 'y').min(-5).max(5).step(0.001).name('rectAreaLight2Y')
// waterFolder.add(rectAreaLight2.position, 'z').min(-5).max(5).step(0.001).name('rectAreaLight2Z')



const rectAreaLight3 = new THREE.RectAreaLight(0x0000ff, 30, 4,1) 
                            //color, intensity, width, height)
rectAreaLight3.rotation.y=  Math.PI *0.5
rectAreaLight3.rotation.x=  Math.PI *0.5

rectAreaLight3.position.set(1.154,0.5,-1.38)
rectAreaLight3.rotation.set(-0.5,-4.68,-1.5)
waterGroup.add(rectAreaLight3)

// waterFolder.add(rectAreaLight3.position, 'x').min(-5).max(5).step(0.001).name('rectAreaLightX')  //commented because I've found the best position
// waterFolder.add(rectAreaLight3.position, 'y').min(-5).max(5).step(0.001).name('rectAreaLightY')
// waterFolder.add(rectAreaLight3.position, 'z').min(-5).max(5).step(0.001).name('rectAreaLightZ')

waterFolder.add(waterGroup, 'visible')
waterFolder.add(rectAreaLight, 'intensity')  //I've got problem with putting this
waterFolder.add(rectAreaLight2, 'intensity')  //as a waterGroup - the site were freezing 
waterFolder.add(rectAreaLight3, 'intensity')

//const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
//rectAreaLight.add( rectAreaLightHelper )


/*--------------------------- FIREFLIES -------------------------------------------------------------------- */
//from Patricle system - they are awesome by Design Course - yt 
const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 1000
const posArray = new Float32Array(particlesCount *3)
//here we are specifing the size of the array - for us its the count of fireflies  *3 
//-> because we want to have 3 variables for position - x,y,z
//becaues of xyz, xyz, xyz...

for(let i = 0; i<particlesCount; i++)   //changed the position for my purposes
{
    posArray[i*3 + 0] = ((Math.random()-0.5) * 1)+0.5
    posArray[i*3 + 1] = (Math.random() * 10) - 0.25
    posArray[i*3 + 2] = ((Math.random()-0.5) * 8) -2
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
//this is sending postitionArray as the attribute to our geometry ^ 
//name for the attribute is position, after we have to convert it to the buffer attribute. 
//And at the end we have to spicify how many values per vertex we want -in this case as for position - 3 values: x,y,z 


const particlesMaterial = new THREE.PointsMaterial({ size: 0.01})
const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particleMesh)


/* --------------------------- SIZES -------------------------------------------------------------------- */

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
    })


/*--------------------------- CAMERA -------------------------------------------------------------------- */

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1,100)
camera.position.set(2,2,2)
scene.add(camera)

/* CONTROLS ----------------- */
const controls = new OrbitControls(camera, canvas)
//controls.target.y =-2
controls.enableDamping = true //po przesunieciu ekranu nie zatrzymuje sie on od razu tylko po chwili 


/*--------------------------- RENDERER -------------------------------------------------------------------- */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap 
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera) 

debugObject.clearColor = '#201818'  //clear color is the property //debug Object is the container 
renderer.setClearColor(debugObject.clearColor)  //from threejs-journey course 
gui
    .addColor(debugObject, 'clearColor')
    .onChange(() =>
    {
        renderer.setClearColor(debugObject.clearColor)
    })


/*--------------------------- ANIMATIONS -------------------------------------------------------------------- 
*/
const clock = new THREE.Clock() 
let previousTime = 0 


const tick = () =>  //A tick is the dequeuing of an event from the "event loop queue" and the execution of said event
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    /* deltaTime contains the time difference between the beginning 
    of the previous frame and the beginning of the current frame in milliseconds. */
    previousTime = elapsedTime

    sungGroup.position.y = Math.cos(elapsedTime)*5  //sinusoida 
    sungGroup.position.x = Math.sin(elapsedTime)*5  //cosinuida
    //together it makes our sun to run on circle 

    particleMesh.position.y= Math.sin(elapsedTime)
    candle1Group.position.y= (Math.sin(elapsedTime)/20 +1.1)
    candle2Group.position.y= (Math.cos(elapsedTime)/20 +1.1)
    candle3Group.position.y= (Math.cos(elapsedTime)/20 +3.3)
    candle4Group.position.y= (Math.sin(elapsedTime)/20 +3.3)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()