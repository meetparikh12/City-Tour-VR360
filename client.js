// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';
import { getListOfTransitions, getListOfToolTips } from './services/location-service';
let r360;
function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      new SurfaceModule(),
      new TransitionModule()
    ],
    ...options,
  });

  introPanel = new Surface(
    500,
    400,
    Surface.SurfaceShape.Cylinder
  )

  introRoot = r360.renderToSurface(
    r360.createRoot('TourismAppVR', {}),
    introPanel
  )

  // r360.renderToLocation(
  //   r360.createRoot('BabyBoy', {}),
  //   r360.getDefaultLocation()
  // )


  // theatrePanel = new Surface(
  //   100,
  //   100,
  //   Surface.SurfaceShape.Flat
  // )

  // theatrePanel.setAngle(0.4,.25)
  
  // stateAdministrationPanel = new Surface(
  //   100,
  //   100,
  //   Surface.SurfaceShape.Flat
  // )
  // stateAdministrationPanel.setAngle(2.4,0.25)

  // youthCenterPanel = new Surface(
  //   100,
  //   100,
  //   Surface.SurfaceShape.Flat
  // )

  // youthCenterPanel.setAngle(-2.25,0.2)
  

  // locationPoint = new Surface(
  //   100,
  //   100,
  //   Surface.SurfaceShape.Flat
  // )
  // locationPoint.setAngle(1.2,0.25)

  // Render your app content to the default cylinder surface
  // r360.renderToSurface(
  //   r360.createRoot('React360_starter_project', { /* initial props */ }),
  //   r360.getDefaultSurface()
  // );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('city_center.jpg'));
}

class SurfaceModule extends Module{
  constructor(){
    super('SurfaceModule');
  }

  roots = [];
  surfaces = [];

  setTooltipsForThumbnail(location){
      if(introRoot){
        r360.detachRoot(introRoot)
      }
      this.detachAll();
      const tooltips = getListOfToolTips(location);
      tooltips.map((item,index) => {
        this.surfaces.push(new Surface(item.width, item.height, Surface.SurfaceShape.Flat))
        this.surfaces[index].setAngle(item.yaw, item.pitch)
        this.roots.push(r360.renderToSurface(r360.createRoot('InfoPanel', {width: item.width, height: item.height, text: item.text, infoImg: item.img, index: index}), this.surfaces[index]))
      })
  }

  detachAll(){
    for(let root of this.roots){
      r360.detachRoot(root);
    }
  }

  // start() {
  //     r360.renderToSurface(
  //       r360.createRoot('InfoPanel', { id: 'shevchenko_theatre', text: 'A famous Shechenko theatre!'}),
  //       theatrePanel
  //     )
  //     r360.renderToSurface(
  //       r360.createRoot('InfoPanel', {id : 'state_administration', text: 'This is the state administration office!'}),
  //       stateAdministrationPanel
  //     )

  //     r360.renderToSurface(
  //       r360.createRoot('InfoPanel', {id: 'youth_center', text:'A center for all youth!'}),
  //       youthCenterPanel
  //     )   
  //     r360.renderToSurface(
  //       r360.createRoot('LocationPanel', {goesTo: 'PopudrenkoPark'}),
  //       locationPoint
  //     )
  //     r360.detachRoot(introRoot);
  // };
  resizeSurface(width,height,index){
    // if(id==='shevchenko_theatre'){
    //   theatrePanel.resize(width,height)
    // } else if (id === 'state_administration') {
    //   stateAdministrationPanel.resize(width, height)
    // } else if (id === 'youth_center') {
    //   youthCenterPanel.resize(width, height)
    // }
    this.surfaces[index].resize(width,height);
  }
}
class TransitionModule extends Module{
    constructor(){
      super('TransitionModule')
    }
    roots = [];

    setTooltipsForTransition(location){
      this.detachAll();
      const tooltips = getListOfTransitions(location);
      tooltips.map(item=> {
        const surface = new Surface(
          item.width,
          item.height,
          Surface.SurfaceShape.Flat
        )
        surface.setAngle(item.yaw, item.pitch)
        this.roots.push(
          r360.renderToSurface(
            r360.createRoot('LocationPanel', {width: item.width, height: item.height, goesTo: item.goesTo}),
            surface
          )
        )
      })
    }
    detachAll(roots){
      for(let root of this.roots){
        r360.detachRoot(root);
      }
    }
}

class ToolTipModule extends Module{
  constructor(){
    super('ToolTipModule')
  }
  roots = [];
}
window.React360 = {init};
