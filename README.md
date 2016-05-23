# SeeTodo
Une application simple de gestion de liste des tâches pour appareils android et ios.


## Réalisé avec les technologies suivantes
- [AngularJS](https://angularjs.org/)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Ionic](http://ionicframework.com/)
- [IonicMaterial](http://http://ionicmaterial.com/)
- [Karma](http://karma-runner.github.io)
- [Sass](http://sass-lang.com/)


## Installation

#### L'installation requiert les outils `gulp`, `ionic` et `cordova`:
```
npm install -g gulp ionic cordova
```

#### Clonage du projet:
```
git clone https://github.com/Jbz797/SeeTodo.git
```


## Emulation

#### Aller dans le projet:
```
cd SeeTodo
```

#### Construire les plateformes et modules:
```
ionic platform add ios
ionic platform add android
npm install
```
#### Pour tester l'application dans votre navigateur:
```
npm install -g ripple-emulator
ripple emulate
```

### Test unitaires

```
$ npm test
```
