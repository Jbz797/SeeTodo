# SeeTodo
Gestionnaire de liste des tâches pour appareils android et ios.


## Réalisé avec les technologies suivantes
- [AngularJS](https://angularjs.org/)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Ionic](http://ionicframework.com/)
- [IonicMaterial](http://http://ionicmaterial.com/)
- [Karma](http://karma-runner.github.io)
- [Sass](http://sass-lang.com/)


## Installation

#### Installer les outils `gulp`, `ionic` et `cordova` :
```
npm install -g gulp ionic cordova
```

#### Cloner le projet :
```
git clone https://github.com/Jbz797/SeeTodo.git
```


## Emulation

#### Aller dans le projet :
```
cd SeeTodo
```

#### Construire les plateformes et modules :
```
ionic platform add ios
ionic platform add android
npm install
```
#### Tester l'application dans son navigateur :
```
npm install -g ripple-emulator
ripple emulate
```

## Test unitaires

```
npm test
```
